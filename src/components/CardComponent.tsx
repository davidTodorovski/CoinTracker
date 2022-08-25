import { Card, CardContent, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

interface Props {
  title: string;
  children: JSX.Element;
}

const useStyles = makeStyles(() => ({
  cardHeading: {
    backgroundColor: "#F4F4F4",
    padding: "10px !important",
  },
  cardTitle: {
    color: "#BBBBBB",
  },
  cardPrimaryContent: {
    padding: "0px !important",
  },
}));

const CardComponent = ({ title, children }: Props) => {
  const classes = useStyles();

  return (
    <Card raised>
      <CardContent className={classes.cardHeading}>
        <Typography className={classes.cardTitle}>{title}</Typography>
      </CardContent>
      <CardContent className={classes.cardPrimaryContent}>
        {children}
      </CardContent>
    </Card>
  );
};

export default CardComponent;
