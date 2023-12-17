import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { instance } from "../../helpers/api";
import { Comment } from "./comment";
import { getComments } from "../api/getComments";
import { UserContext } from "../Contexts/UserContext";
import "./comments.css";
import { getUser } from "../api/getUser";

function Comments() {
  const { id } = useParams();
  const { userValue, setUserValue } = useContext(UserContext);

  const [comments, setComments] = useState([]);
  const [editedCommentId, setEditedCommentId] = useState(null);
  const [comment, setComment] = useState({
    comment: "",
  });

  // get all user comments of an activity by its id from data base and stores it in the comments state.
  const handleLoad = () => {
    getComments(id).then((response) => {
      setComments(response);
    });

    getUser()
      .then((response) => {
        response ? setUserValue(response) : setUserValue({ id: "" });
      })

      .catch((error) => console.log(error));
  };

  useEffect(() => {
    handleLoad();
  }, []);

  //store the user input text to the comment state.
  const handleTextChange = (event) => {
    setComment({ ...comment, [event.target.id]: event.target.value });
  };

  //sends the user comment and pictures to get stored in the back-end db.
  const onSubmit = (event) => {
    event.preventDefault();

    instance
      .post(`/activities/${id}/comments`, comment)
      .then((response) => {
        // setComments to the updated list of comments and triggers a rerender with changes .
        setComments(response.data);
      })
      .catch((error) => console.log(error));

    // clears the comment state so a new comment can be typed in the text are.
    setComment({
      comment: "",
    });
  };

  // handleEditSubmit get triggered in Comment.js and receives the editedComet then calls a put request to the back end with the new comment.
  const handleEditSubmit = (comment) => {
    instance.put(`/activities/${id}/comments/${editedCommentId}`, comment).then((response) => {
      if (response.data) {
        // setEditedCommentId to null so the text display gets replaced by the comment and edit/delete button.
        setEditedCommentId(null);
        // setComments to the updated list of comments and triggers a rerender with changes .
        setComments(response.data);
      }
    });
  };

  //gets triggered from Comment.js and get the argument passed through props then makes a delete request with comment id to the back-end.
  const handleDelete = (commentId, commentUserId) => {
    instance
      .delete(`/activities/${id}/comments/${commentId}?commentUser=${commentUserId}`)
      .then((response) => {
        setComments(response.data);
        setEditedCommentId(null);
      })

      .catch((error) => console.warn(error));
  };

  // onclick edit button gets comment object from Comment.js through the onEditFn prop and sets the comment id to editedCommentId state.
  const handleCommentEdit = (comment) => {
    setEditedCommentId(comment.id);
  };

  // onclick gets triggered from Comments.js through onCancelFn prop and resets editedCommentId to null.
  const handleCancelCommentEdit = (comment) => {
    setEditedCommentId(null);
  };

  const allComments = comments.map((comment, i) => {
    return (
      <Comment
        key={comment.id}
        comment={comment}
        edit={editedCommentId === comment.id}
        onEditFn={handleCommentEdit}
        onCancelFn={handleCancelCommentEdit}
        onEditSubmit={handleEditSubmit}
        onDeleteFn={handleDelete}
        commentUserId={comment.user_id}
        currentUser={userValue.id}
      />
    );
  });

  return (
    <div className="CommentSection">
      <div className="CommentForm">
        <form onSubmit={onSubmit}>
          <label htmlFor="Comment">Comment:</label>
          <input
            id="comment"
            value={comment.comment}
            type="textarea"
            onChange={handleTextChange}
            placeholder="Comment..."
            required
          />

          <button type="submit">Submit</button>
        </form>
      </div>
      {allComments}
    </div>
  );
}

export default Comments;
