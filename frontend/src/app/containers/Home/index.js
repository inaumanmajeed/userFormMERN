import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import LayoutMainWeb from "app/layouts/web";
import BasicInfoCard from "app/components/home/userInputcards/BasicInfoCard";
import { FormButtons, MainContainerWrapper } from "../styles";
import ValidationSchema from "app/utils/ValidationSchema";
import EducationInfoCard from "app/components/home/userInputcards/Education";
// Import the createData function from your Axios CRUD utility
import { createData } from "app/hooks/AxiosCRUD";

const initialValues = {
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
};

const Home = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (values) => {
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
      // Send data to the backend
      const response = await createData(body);
      console.log("Data submitted:", response);

      setIsSubmitted(true);
      setIsEditable(true);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const HandleRedirect = () => {
    navigate("/update");
  };

  return (
    <LayoutMainWeb>
      <MainContainerWrapper>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={ValidationSchema}
        >
          {() => (
            <Form className="form__main">
              <BasicInfoCard
                isEditable={isEditable}
                boxShadow={"0px 0px 40px 0px #FFEEC266"}
              />

              <EducationInfoCard
                isEditable={isEditable}
                boxShadow={"0px 0px 50px 0px #FFB0C44D"}
              />
              <FormButtons className="input__form__buttons">
                <button className="submit__btn" type="submit">
                  {isSubmitted ? "Submitted" : "Submit"}
                </button>
                {isSubmitted && (
                  <button
                    onClick={HandleRedirect}
                    type="button"
                    className="redirect__btn"
                  >
                    View Details
                  </button>
                )}
              </FormButtons>
            </Form>
          )}
        </Formik>
      </MainContainerWrapper>
    </LayoutMainWeb>
  );
};

export default Home;
