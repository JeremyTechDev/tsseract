import { makeStyles } from "@material-ui/core";

interface Props {
  bg?: string;
  color?: string;
}

const useStyles = makeStyles(
  {
    btn: { margin: 15 },
    margin: {
      margin: "10px 5px",
      width: 225,
    },
    grid: {
      backgroundImage: ({ bg }: Props) => `url(${bg})`,
      backgroundSize: "cover",
      minHeight: "100vh",
      minWidth: "100%",
    },
    centered: {
      left: "50%",
      position: "fixed",
      top: "50%",
      transform: "translate(-50%, -50%)",
    },
    imgInfo: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      borderRadius: 4,
      color: "#fff",
      margin: 5,
      padding: 10,
    },
    progress: {
      color: "#fff",
    },
    divider: { margin: "20px auto" },
  },
  { index: 1 }
);

export default useStyles;
