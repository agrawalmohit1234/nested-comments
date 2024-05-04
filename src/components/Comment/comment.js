import React, { useState } from "react";
import PropTypes from "prop-types";

import Action from "../Action/Action";

const Comment = ({
  comment,
  onAddComment,
  onDeleteComment,
  onEditComment,
  onLikeComment,
}) => {
  const [input, setInput] = useState("");
  const [showReply, setShowReply] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [like, setLike] = useState(0);
  const [likeNum, setLikeNum] = useState(false);

  const handleInput = (e) => {
    setInput(e?.target?.value);
  };

  return (
    <div>
      {comment?.id === 1 ? (
        <div>
          <h2>Nested Comments</h2>
          <hr />
          <input
            className="input"
            type="text"
            placeholder="Add Comments..."
            value={input}
            onChange={handleInput}
          />
          <Action
            type="Comment"
            className="commentBtn"
            handleClick={() => {
              onAddComment(input, comment?.id);
              setInput("");
            }}
          />
        </div>
      ) : (
        <div>
          <div className="editComment">
            {showEdit ? (
              <div>
                <input
                  className="input"
                  type="text"
                  placeholder="Edit Comments..."
                  value={input}
                  onChange={handleInput}
                />
                <Action
                  type="save"
                  className="commentBtn"
                  handleClick={() => {
                    onEditComment(input, comment.id);
                    setShowEdit(false);
                  }}
                />
                <Action
                  type="cancel"
                  className="commentBtn"
                  handleClick={() => setShowEdit(false)}
                />
              </div>
            ) : (
              <div>
                <div className="commentValue">{comment?.name}</div>
                {likeNum > 0 && (
                  <div className="likes">
                    &hearts;: {comment?.like + likeNum}
                  </div>
                )}
                {showReply ? (
                  <div>
                    <input
                      className="input"
                      type="text"
                      placeholder="Reply Comments..."
                      value={input}
                      onChange={handleInput}
                    />
                    <Action
                      type="save"
                      className="commentBtn"
                      handleClick={() => {
                        onAddComment(input, comment?.id);
                        setInput("");
                        setShowReply(false);
                      }}
                    />
                    <Action
                      type="cancel"
                      className="commentBtn"
                      handleClick={() => setShowReply(false)}
                    />
                  </div>
                ) : (
                  <div>
                    <Action
                      type="Like"
                      className="commentBtn"
                      handleClick={() => {
                        if (like) {
                          setLikeNum(likeNum - 1);
                        } else {
                          setLikeNum(likeNum + 1);
                        }
                        setLike(!like);
                      }}
                    />
                    <Action
                      type="Reply"
                      className="commentBtn"
                      handleClick={() => setShowReply(true)}
                    />
                    <Action
                      type="Edit"
                      className="commentBtn"
                      handleClick={() => {
                        setShowEdit(true);
                        setInput(comment?.name);
                      }}
                    />
                    <Action
                      type="Delete"
                      className="commentBtn"
                      handleClick={() => onDeleteComment(comment?.id)}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      <div style={{ paddingLeft: "24px", marginTop: "6px" }}>
        {comment?.items &&
          comment?.items?.map((comm) => {
            return (
              <Comment
                comment={comm}
                onAddComment={onAddComment}
                onDeleteComment={onDeleteComment}
                onEditComment={onEditComment}
                onLikeComment={onLikeComment}
              />
            );
          })}
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object,
  onAddComment: PropTypes.func,
  onDeleteComment: PropTypes.func,
  onEditComment: PropTypes.func,
  onLikeComment: PropTypes.func,
};

Comment.defaultProps = {
  comment: {
    id: 1,
    items: [],
  },
};

export default Comment;
