import AddReactionOutlined from "@mui/icons-material/AddReactionOutlined";
import Comment from "@mui/icons-material/Comment"
import DeleteSweep from "@mui/icons-material/DeleteSweep";
import EditNote from "@mui/icons-material/EditNote";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import FileCopy from "@mui/icons-material/FileCopy";
import LabelImportant from "@mui/icons-material/LabelImportant";
import Public from "@mui/icons-material/Public";
import Share from "@mui/icons-material/Share";
import Alert from "@mui/material/Alert"
import AlertTitle from "@mui/material/AlertTitle"
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Snackbar from "@mui/material/Snackbar";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { DialogForm } from "../ui/dialog/DialogForm";
import { PoVFormFields } from "./PoVFormFields";
import {
  commentPoV,
  deletePoV,
  likePoV,
  unLikePoV,
  updatePoV,
} from "../../../services/api/pov/api-pov";
import {
  editPoV,
  removePov,
} from "../../../services/redux/slices/pov/povSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatNumber } from "../../../utils/formatNumber";
import { DialogDelete } from "../ui/dialog/DialogDelete";
import { DialogCommentPoV } from "../ui/dialog/DialogCommentPoV";

export const PoV = ({ pov }) => {
  const dispatch = useDispatch();
  const userAccount = useSelector((state) => state.userAccount);

  const [editedPoV, setEditedPoV] = useState(pov);
  const [speedActions, setSpeedActions] = useState([
    { icon: <FileCopy />, name: "Copy" },
    { icon: <Share />, name: "Share" },
    { icon: <Comment />, name: "Comment" },
  ]);

  useEffect(() => {
   // const likeFound = pov.likes.find(
   //   (like) => userAccount && userAccount.id === like
   // );
    userAccount && userAccount.id === pov.author.id
      ? setSpeedActions([
        {
          icon: <DeleteSweep />,
          name: "Delete",
        },
        { icon: <EditNote />, name: "Edit" },
        pov.published
          ? { icon: <Public />, name: "Unpublish" }
          : { icon: <Public />, name: "Publish" },
        // { icon: <FileCopy />, name: "Copy" },
        { icon: <Share />, name: "Share" },
        { icon: <Comment />, name: "Comment" },
       // likeFound
       //   ? {
       //     icon: <Favorite />,
       //     name: `UnLike (${formatNumber(pov.likes.length)})`,
        //  }
        //  :
 {
            icon: <FavoriteBorder />,
            name: `Like (${formatNumber(pov.likeCount)})`,
          //  name: `Like (${formatNumber(pov.likes.length)})`,
          },
      ])
      : setSpeedActions([
        { icon: <FileCopy />, name: "Copy" },
        { icon: <Share />, name: "Share" },
        { icon: <Comment />, name: "Comment" },
       // likeFound
      //   ? {
       //     icon: <Favorite />,
        //    name: `UnLike (${formatNumber(pov.likes.length)})`,
       //   }
       //   : 
{
            icon: <FavoriteBorder />,
            name: `Like (${formatNumber(pov.likeCount)})`,
        //    name: `Like (${formatNumber(pov.likes.length)})`,
          },
      ]);
  }, [userAccount, pov]);

  const [error, setError] = useState("");
  const [openPoVDialog, setOpenPoVDialog] = useState(false);
  const [openErrorSnackBar, setOpenErrorSnackBar] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openCommentPoVDialog, setOpenCommentPoVDialog] = useState(false);

  const handleCloseErrorSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenErrorSnackBar(false);
  };

  const handleOpenCommentPoVDialog = () => {
    setOpenCommentPoVDialog(true);
  };

  const handleCloseCommentPoVDialog = () => {
    setOpenCommentPoVDialog(false);
  };

  const handleOpenPoVDialog = () => {
    setOpenPoVDialog(true);
  };

  const handleClosePoVDialog = () => {
    setOpenPoVDialog(false);
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handlePublishPoV = async () => {
    let publish = !pov.published;
    await updatePoVHandle({ ...pov, published: publish });
  };

  const handleLike = async () => {

  //  const likeFound = pov.likes.find((like) => like === userAccount.id);
  //  // console.log("like found ", likeFound);
  //  if (likeFound) {
   //   // console.log("clicked to unlike");
   //   await unLikePoV(pov.id)
  //     .then((unLikedPoV) => {
  //        // console.log("like pov ", likedPoV);
   //       // dispatch pov edit
   //       if (unLikedPoV) {
   //         dispatch(editPoV(unLikedPoV));
   //       }
   //     })
   //     .catch((error) => {
   //       setError(error);
   //       setOpenErrorSnackBar(true);
   //     });
   // } else {
   //   // console.log("clicked to like");
      await likePoV(pov.id)
        .then((likedPoV) => {
          // console.log("like pov ", likedPoV);
          // dispatch pov edit
          if (likedPoV) {
            dispatch(editPoV(likedPoV));
          }
        })
        .catch((error) => {
          setError(error);
          setOpenErrorSnackBar(true);
        })
   // }

  };

  const handleCommentPoV = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    formData.append("povId", pov.id);
    const formJson = Object.fromEntries(formData.entries());

    await commentPoVHandle(formJson);
  };

  const commentPoVHandle = async (povComment) => {
    try {
      // console.log("comment ", await povComment);
      const povCommented = await commentPoV(pov.id, povComment);
      if (povCommented) {
        dispatch(editPoV(povCommented));
        // handleClosePoVDialog();
      }
    } catch (error) {
      setError(error);
      setOpenErrorSnackBar(true);
      handleClosePoVDialog();
    }
  };

  const handleClickAction = (action) => {
    switch (action) {
      case "Delete":
        handleOpenDeleteDialog();
        break;

      case "Edit":
        handleOpenPoVDialog();
        break;

      case "Publish":
        handlePublishPoV();
        break;

      case "Unpublish":
        handlePublishPoV();
        break;

      case "Share":
        console.log(action);
        break;

      case "Copy":
        console.log(action);
        break;

      case `Like (${formatNumber(pov.likeCount)})`:
        handleLike();
        break;

      case `UnLike (${formatNumber(pov.likeCount)})`:
        handleLike();
        break;

      case "Comment":
        handleOpenCommentPoVDialog();
        break;

      default:
        break;
    }
  };

  // handle pov changes in input fields
  const handlePoVInputChange = (event) => {
    const { name, value } = event.target;
    setEditedPoV({
      ...editedPoV,
      [name]: value,
    });
  };

  const handleSubmitPoVUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    await updatePoVHandle({ ...pov, ...formJson });
  };

  const updatePoVHandle = async (povUpdate) => {
    try {
      // console.log("pov update: ",povUpdate)
      const povFormData = new FormData();
      povFormData.append(
        "pov",
        new Blob([JSON.stringify(povUpdate)], { type: "application/json" })
      );
      const poVUpdated = await updatePoV(pov.id, povFormData);
      if (poVUpdated) {
        dispatch(editPoV(poVUpdated));
        handleClosePoVDialog();
      }
    } catch (error) {
      setError(error);
      setOpenErrorSnackBar(true);
      handleClosePoVDialog();
    }
  };

  const handlePoVDelete = async () => {
    try {
      const poVDeleted = await deletePoV(pov.id);
      console.log("POV deleted", poVDeleted);

      if (poVDeleted) {
        dispatch(removePov(pov.id));
        handleCloseDeleteDialog();
      }
    } catch (error) {
      setError(error);
      setOpenErrorSnackBar(true);
      handleCloseDeleteDialog();
    }
  };

  return (
    <Stack
      container
      direction={"column"}
      spacing={1}
      sx={{
        // my: 1,
        // width: "100%",
      }}
    >
      <Card
        variant="elevation"
        elevation={2}
        sx={{
          // borderRadius: 2,
          borderTopRightRadius: 25,
          display: "flex",
          padding: 1,
          flexDirection: "column",
          border: "none"
          // minHeight: "80vh",
        }}
      >
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack direction={"row"} spacing={1}>
            <Link to={`/profile/${pov.author && pov.author.id}`}>
              <Avatar src={pov.author && pov.author.displayPicture} alt={pov.author && pov.author.name.first} />
            </Link>
            <Stack>
              <Typography
                variant="h4"
                color={"primary"}
                sx={{ overflowWrap: "anywhere", wordWrap: "break-word" }}
              >
                {pov && pov.title.toUpperCase()}
              </Typography>
              <Typography
                variant="subtitle2"
                color={"secondary"}
                sx={{ overflowWrap: "anywhere", wordWrap: "break-word" }}
              >
                {`${pov.author && pov.author.name.first} ${pov.author && pov.author.name.last}`}
              </Typography>
            </Stack>
          </Stack>
          {pov.published && <Public fontSize="small" />}{" "}
        </Stack>
        <CardContent sx={{ mb: 0, pb: 0 }}>
          {pov.points.split("\n").map((point, i) => (
            <Stack direction={"row"} key={i}>
              <LabelImportant sx={{ mr: 1 }} fontSize="small" />
              <Typography
                variant="body2"
                sx={{ overflowWrap: "anywhere", wordWrap: "break-word" }}
              >
                {point}
              </Typography>
            </Stack>
          ))}
        </CardContent>

      </Card>
      <SpeedDial
        FabProps={{ size: "small" }}
        direction="left"
        ariaLabel="SpeedDial openIcon"
        sx={{
          // transform: "translateZ(0px)",
          position: "relative",
          bottom: "0px",
          right: "0px",
        }}
        icon={<SpeedDialIcon openIcon={<AddReactionOutlined />} />}
      >
        {speedActions.map((action) => (
          <SpeedDialAction
            slotProps={{
              fab: { size: "small" },
              tooltip: { title: action.name }
            }}
            onClick={() => handleClickAction(action.name)}
            key={action.name}
            icon={action.icon}
          />
        ))}
      </SpeedDial>
      <DialogForm
        title={"Edit Your PoV"}
        text={"Fill in data to point your view"}
        open={openPoVDialog}
        handleOpen={handleOpenPoVDialog}
        handleClose={handleClosePoVDialog}
        handleSubmit={handleSubmitPoVUpdate}
        fields={
          <PoVFormFields
            editedPoV={editedPoV}
            handleInputChange={handlePoVInputChange}
          />
        }
      />

      {/* delete pov dialog */}
      <DialogDelete
        openDeleteDialog={openDeleteDialog}
        handleCloseDeleteDialog={handleCloseDeleteDialog}
        handleDelete={handlePoVDelete}
        title={pov.title}
        content={`Are you sure to delete "${pov.title}" PoV?`}
      />

      {/* comment PoV */}
      <DialogCommentPoV
        open={openCommentPoVDialog}
        handleClose={handleCloseCommentPoVDialog}
        handleSubmit={handleCommentPoV}
        pov={pov}
      />

      <Snackbar
        open={openErrorSnackBar}
        autoHideDuration={10000}
        onClose={handleCloseErrorSnackBar}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Alert
          // title="Error"
          onClose={handleCloseErrorSnackBar}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      </Snackbar>
    </Stack>
  );
};
