import React, { useCallback, useState } from "react";

import Comment from "./components/Comment/comment";
import "./styles.css";

const comments = {
  id: 1,
  items: [],
};

const App = () => {
  const [commentData, setCommentData] = useState(comments);

  const addComment = useCallback((arr, comment, id) => {
    for (let i = 0; i < arr?.length; i++) {
      if (arr[i]?.id === id) {
        arr[i]?.items?.push({
          id: Date.now(),
          name: comment,
          like: 0,
          items: [],
        });
      } else if (arr[i]?.items?.length > 0) {
        addComment(arr[i]?.items, comment, id);
      }
    }
    return arr;
  }, []);

  const deleteComment = useCallback((arr, id) => {
    for (let i = 0; i < arr?.length; i++) {
      if (arr[i]?.id === id) {
        arr?.splice(i, 1);
      } else if (arr[i]?.items?.length > 0) {
        deleteComment(arr[i]?.items, id);
      }
    }
    return arr;
  }, []);

  const likeComment = useCallback((arr, id) => {
    for (let i = 0; i < arr?.length; i++) {
      if (arr[i]?.id === id) {
        arr[i].like += 1;
      } else if (arr[i]?.items?.length > 0) {
        likeComment(arr[i]?.items, id);
      }
    }
    return arr;
  }, []);

  const editComment = useCallback((arr, comment, id) => {
    for (let i = 0; i < arr?.length; i++) {
      if (arr[i]?.id === id) {
        arr[i].name = comment;
      } else if (arr[i]?.items?.length > 0) {
        editComment(arr[i]?.items, comment, id);
      }
    }
    return arr;
  }, []);

  const handleAddComment = useCallback(
    (comment, id) => {
      if (id === 1) {
        commentData?.items?.push({
          id: Date.now(),
          name: comment,
          like: 0,
          items: [],
        });
      } else {
        let latestData = addComment(commentData?.items, comment, id);
        commentData.items = latestData;
      }
      setCommentData({ ...commentData });
    },
    [addComment, commentData]
  );

  const handleDeleteComment = useCallback(
    (id) => {
      let latestData = deleteComment(commentData?.items, id);
      commentData.items = latestData;
      setCommentData({ ...commentData });
    },
    [commentData, deleteComment]
  );

  const handleEditComment = useCallback(
    (comment, id) => {
      let latestData = editComment(commentData?.items, comment, id);
      commentData.items = latestData;
      setCommentData({ ...commentData });
    },
    [commentData, editComment]
  );

  const handleLike = useCallback(
    (id) => {
      let latestCommentData = likeComment(commentData?.items, id);
      commentData.items = latestCommentData;
      setCommentData({ ...commentData });
    },
    [commentData, likeComment]
  );

  return (
    <Comment
      comment={commentData}
      onAddComment={handleAddComment}
      onDeleteComment={handleDeleteComment}
      onEditComment={handleEditComment}
      onLikeComment={handleLike}
    />
  );
};

export default App;
