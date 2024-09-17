import { styled } from "@mui/material/styles";

const MainContainerWrapper = styled("div")(({ theme }) => ({
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: "16px",
  width: "100%",
  height: "100%",
  overflowY: "auto",
  "& .fetch-container": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "16px",
    width: "100%",
    height: "100%",
    "& input": {
      padding: "8px",
      fontSize: "1rem",
      width: "45%",
      border: "1px solid #CED4DA",
      borderRadius: "8px",
      outline: "none",
      marginbottom: "4px",
      "&::placeholder": {
        color: "#6C757D80",
        fontSize: "12px",
      },
    },
  },
  "& .form__main": {
    width: "100%",
  },
  [theme.breakpoints.down("md")]: {
    padding: "8px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "4px",
  },
  [theme.breakpoints.down("xs")]: {
    padding: "2px",
  },
}));

const FormButtons = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "16px",

}));

export { MainContainerWrapper, FormButtons };
