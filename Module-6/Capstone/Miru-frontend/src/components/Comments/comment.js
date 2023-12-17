import React from "react";
import { useState, useEffect } from "react";

export const Comment = ({
  comment,
  edit,
  onEditFn,
  onCancelFn,
  onEditSubmit,
  onDeleteFn,
  commentUserId,
  currentUser,
}) => {
  const [editedComment, setEditedComment] = useState(comment);

  // sets the editedComment to the original comment so that it auto fill the edit text input.
  useEffect(() => {
    setEditedComment(comment);
  }, [comment]);

  //handles the user text input and stores it in the editedComment state.
  const handleChange = (event) => {
    setEditedComment({ ...editedComment, [event.target.id]: event.target.value });
  };

  // on clicking edit button sends the comment object back to comments to trigger the handleCommentEdit in Comments.js
  const handleEdit = () => {
    onEditFn(comment);
  };

  // on clicking cancel button runs the handleCancel fun witch triggers the handleCancelCommentEdit in Comments.js
  const handleCancel = () => {
    onCancelFn();
  };

  // on clicking Submit button passes the editedComment as argument through props .
  const handleSubmit = () => {
    onEditSubmit(editedComment);
  };

  // on clicking cancel button runs the handleDelete fun in Comments.js and passes comment id as an argument through props.
  const handleDelete = () => {
    onDeleteFn(comment.id, commentUserId);
  };

  // edit and delete button will only display if the user that created to comment is logged in.
  const showEditButton = commentUserId === currentUser ? <button onClick={handleEdit}>Edit</button> : null;
  const showDeleteButton = commentUserId === currentUser ? <button onClick={handleDelete}>Delete</button> : null;

  // The edit prop will be true or false depending if editedCommentId === comment.id.
  // When edit is false the comment along with the edit and delete buttons will display.
  // When edit is true the text area along with submit and cancel button will display.
  return (
    <div className="Comment" key={comment.id}>
      <h6>{comment.name}</h6>

      {!edit && (
        <div className="comment-buttons">
          <p>{comment.comment}</p>
          {showEditButton}
          {showDeleteButton}
        </div>
      )}

      {edit && (
        <div>
          <textarea
            id="comment"
            value={editedComment.comment}
            type="textarea"
            onChange={handleChange}
            placeholder="User Name"
            required
          />

          <button onClick={handleSubmit}>Submit</button>
          <button value={`${comment.id}`} onClick={handleCancel}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};
