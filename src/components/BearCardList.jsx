import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function BearCardList({ ListOfBear, ListOfImage }) {
  const classes = useStyles();
  console.log(ListOfImage, "ListOfImage");
  return (
    <List className={classes.root}>
      {ListOfBear.map((bear, index) => {
        return (
          <React.Fragment>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={ListOfImage[index % 5].image} />
              </ListItemAvatar>
              <ListItemText
                primary={bear.name}
                secondary={
                  <React.Fragment>
                    <div><b>Style :</b> {bear.style}</div>
                    <div><b>ounces :</b> {bear.ounces}</div>
                    <div><b>abv :</b> {bear.abv}</div>
                    {bear.ibu && <div><b>ibu :</b> ${bear.ibu}</div>}
                  </React.Fragment>
                }
              />
             
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        );
      })}
    </List>
  );
}
