import React, { useState, useEffect, useRef } from "react";
import { Formik, Form } from "formik";
import LayoutMainWeb from "app/layouts/web";
import BasicInfoCard from "app/components/home/userInputcards/BasicInfoCard";
import EducationInfoCard from "app/components/home/userInputcards/Education";
import { MainContainerWrapper, FormButtons } from "../styles";
import ValidationSchema from "app/utils/ValidationSchema";
import { useNavigate } from "react-router-dom";
import useGetData from "app/hooks/useGetAllData";
import useDeleteData from "app/hooks/useDeleteData";
import useUpdateData from "app/hooks/useUpdateData";

const ShowOrUpdate = () => {
  const [email, setEmail] = useState("");
  const [emailSearch, setEmailSearch] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [storedData, setStoredData] = useState(null);
  const [initialValues, setInitialValues] = useState({
    fullName: "",
    age: "",
    email: "",
    phoneNumber: "",
    gender: "",
    maritalStatus: "",
    location: "",
    nationality: "",
    highestEducationalQualification: "",
    collegeUniversity: "",
    employedIn: "",
    occupation: "",
    countryOfResidence: "",
    annualIncome: "",
    workTravel: "",
    livingWithFamily: "",
  });
  // const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const emailInputRef = useRef(null);

  const { data, isFetching, isLoading } = useGetData(email);
  const { mutate: dataDelete } = useDeleteData(email);
  const { mutate: dataUpdate } = useUpdateData();

  const user = data?.user;
  useEffect(() => {
    if (user) {
      setStoredData(user);
      const flattenedData = {
        ...user.basicInfo,
        ...user.educationInfo,
      };
      setInitialValues(flattenedData);
      setIsEditable(false);
      // setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (countdown === null) return;

    if (countdown === 0) {
      navigate("/");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  const handleFetch = () => {
    if (emailSearch) {
      setEmail(emailSearch);
      // setIsLoading(true);
      setIsEditable(false);
    }
  };

  const onSubmit = async (values) => {
    if (!storedData) return;

    const basicInfo = {
      fullName: values.fullName,
      age: values.age,
      email: values.email,
      phoneNumber: values.phoneNumber,
      gender: values.gender,
      maritalStatus: values.maritalStatus,
      location: values.location,
      nationality: values.nationality,
    };

    const educationInfo = {
      highestEducationalQualification: values.highestEducationalQualification,
      collegeUniversity: values.collegeUniversity,
      employedIn: values.employedIn,
      occupation: values.occupation,
      countryOfResidence: values.countryOfResidence,
      annualIncome: values.annualIncome,
      workTravel: values.workTravel,
      livingWithFamily: values.livingWithFamily,
    };

    const body = {
      basicInfo,
      educationInfo,
    };

    try {
      dataUpdate({ email, body });
      setIsEditable(false);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDelete = async () => {
    if (!storedData) return;

    try {
      dataDelete(email);
      setInitialValues({
        fullName: "",
        age: "",
        email: "",
        phoneNumber: "",
        gender: "",
        maritalStatus: "",
        location: "",
        nationality: "",
        highestEducationalQualification: "",
        collegeUniversity: "",
        employedIn: "",
        occupation: "",
        countryOfResidence: "",
        annualIncome: "",
        workTravel: "",
        livingWithFamily: "",
      });
      setCountdown(3);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, [email]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <LayoutMainWeb>
      <MainContainerWrapper>
        {!storedData ? (
          <div className="fetch-container">
            <input
              type="email"
              value={emailSearch}
              onChange={(e) => setEmailSearch(e.target.value)}
              placeholder="Enter email"
              onFocus={(e) => e.target.select()}
              ref={emailInputRef}
            />
            <button type="button" onClick={handleFetch} disabled={isFetching}>
              Fetch Data
            </button>
          </div>
        ) : (
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={ValidationSchema}
            enableReinitialize={true}
          >
            {({ setFieldValue }) => (
              <Form className="form__main">
                <BasicInfoCard
                  boxShadow={"0px 0px 40px 0px #FFEEC266"}
                  isEditable={!isEditable}
                />
                <EducationInfoCard
                  boxShadow={"0px 0px 50px 0px #FFB0C44D"}
                  isEditable={!isEditable}
                />
                <FormButtons className="form__btns">
                  {!isEditable && (
                    <button
                      type="button"
                      onClick={() => setIsEditable(true)}
                      className="edit__btn"
                    >
                      Update
                    </button>
                  )}
                  {isEditable && (
                    <button className="submit__btn" type="submit">
                      Save
                    </button>
                  )}
                  <button
                    className="delete__btn"
                    type="button"
                    onClick={handleDelete}
                  >
                    {countdown !== null
                      ? `Returning back to home in ${countdown} seconds`
                      : "Delete"}
                  </button>
                </FormButtons>
              </Form>
            )}
          </Formik>
        )}
      </MainContainerWrapper>
    </LayoutMainWeb>
  );
};

export default ShowOrUpdate;
