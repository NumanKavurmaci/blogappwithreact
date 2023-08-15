const express = require("express");
const app = express();
const axios = require("axios"); //for api calls
const serviceAccount = require("D:/new-blog-app/server/numansblogproject-firebase-adminsdk-q3kex-bc6c35565d.json");
const sequelize = require("./sequelize"); //DATABASE CONNECTION
const { BlogPost } = require("./BlogPost"); //TABLES
const { Comment } = require("./Comment"); //TABLES
const { v4: uuidv4 } = require("uuid");
const e = require("express");

app.use(express.json());
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

app.get("/home", async (req, res) => {
  try {
    const [results, metadata] = await sequelize.query(
      "SELECT * FROM public.posts;"
    );
    res.json(results);
    //console.log("Fetched blog posts:", results);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
});

app.get("/SinglePost/:id", async (req, res) => {
  const postId = req.params.id;
  //console.log("postId:", postId);
  try {
    const postQuery = `
      SELECT * FROM public.posts WHERE id = :postId;
    `;

    const [post, _] = await sequelize.query(postQuery, {
      replacements: { postId },
      type: sequelize.QueryTypes.SELECT,
    });
    //console.log("post:", post);

    const [comments, __] = await sequelize.query(
      `SELECT * FROM public.comments WHERE postid = '${postId}';`
    );
    const packedComments = { comments: comments };
    //console.log("packedComments:", packedComments);
    res.json({ post: post, comments: packedComments });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

app.post("/CreatePost", async (req, res) => {
  const { postId, title, content, image, author, date, tags } = req.body;

  try {
    const insertQuery = `
      INSERT INTO public.posts (id, title, content, image, author, date, tags)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const [newPost, _] = await sequelize.query(insertQuery, {
      bind: [postId, title, content, image, author, date, tags],
      type: sequelize.QueryTypes.INSERT,
    });

    res.status(201).json(newPost[0]);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }

  try {
    for (const tag of tags) {
      console.log("postIDs:", postId);
      console.log("tag:", tag);
      const getTagsQuery = `
        SELECT * FROM public.tags WHERE name = $1;
      `;
      const tagItem = await sequelize.query(getTagsQuery, {
        bind: [tag],
        type: sequelize.QueryTypes.SELECT,
      });

      if (tagItem.length === 0) {
        const insertTagQuery = `
          INSERT INTO public.tags (name, posts)
          VALUES ($1, $2)
          RETURNING *;
        `;
        const [newTag, _] = await sequelize.query(insertTagQuery, {
          bind: [tag, postId],
          type: sequelize.QueryTypes.INSERT,
        });
      } else {
        const newPosts = [...tagItem[0].posts, postId];
        const updateTagQuery = `
          UPDATE public.tags 
          SET posts = $1
          WHERE name = $2
          RETURNING *;
        `;
        const [updatedTag, _] = await sequelize.query(updateTagQuery, {
          bind: [newPosts, tag],
          type: sequelize.QueryTypes.UPDATE,
        });
      }
    }
  } catch (error) {
    console.error("Error creating tag:", error);
    res.status(500).json({ error: "Failed to create tag" });
  }
});

app.post("/CreateComment/:id", async (req, res) => {
  const { comment, author } = req.body;
  const postId = req.params.id;
  const date = new Date().toISOString().slice(0, 10);
  try {
    const insertQuery = `
      INSERT INTO public.comments (id,comment, author, date, postid)
      VALUES ('${uuidv4()}', '${comment}', '${author}', '${date}', '${postId}')
      RETURNING *;
    `;

    const [newComment, _] = await sequelize.query(insertQuery, {
      type: sequelize.QueryTypes.INSERT,
    });

    res.status(201).json(newComment[0]);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Failed to create comment" });
  }
});

app.delete("/DeletePost/:id", async (req, res) => {
  console.log("DELETE ACTION");
  const postId = req.params.id;
  try {
    const deletePostQuery = `DELETE FROM public.posts WHERE id = '${postId}';`;
    const deleteCommentsQuery = `DELETE FROM public.comments WHERE postid = '${postId}';`;
    await sequelize.query(deleteCommentsQuery, {
      type: sequelize.QueryTypes.DELETE,
    });
    await sequelize.query(deletePostQuery, {
      type: sequelize.QueryTypes.DELETE,
    });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Failed to delete post" });
  }
});

app.put("/EditPost/:id", async (req, res) => {
  const postId = req.params.id;
  const { title, content, image, author } = req.body;

  try {
    const updateQuery = `
    UPDATE public.posts
    SET title = '${title}', content = '${content}', image = '${image}', author = '${author}'
    WHERE id = '${postId}'
    RETURNING *;
  `;

    const [updatedPost, _] = await sequelize.query(updateQuery, {
      type: sequelize.QueryTypes.UPDATE,
    });

    if (updatedPost.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(updatedPost[0]);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Failed to update post" });
  }
});

app.get("/search", async (req, res) => {
  // Remove the query parameter from the path
  const query = req.query.query; // Use req.query.query to access the query parameter
  const searchQuery = `SELECT * FROM public.posts WHERE title LIKE '%${query}%' OR content LIKE '%${query}%' OR author LIKE '%${query}%';`;
  try {
    const [results, metadata] = await sequelize.query(searchQuery);
    res.json(results);
    console.log("Fetched search results:", results);
  } catch (error) {
    console.error("Error fetching search results:", error);
    res.status(500).json({ error: "Failed to fetch search results" });
  }
});

app.get("/CheckUserLikedPost/:userId/:postId", async (req, res) => {
  const userId = req.params.userId;
  const postId = req.params.postId;
  try {
    const [result] = await sequelize.query(
      `SELECT * FROM public."Likes" WHERE "Likes"."userId" = :userId AND "Likes"."postId" = :postId;
      `,
      {
        replacements: { userId, postId },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    result === undefined
      ? res.json({ result: false })
      : res.json({ result: true });
  } catch (error) {
    console.error("Error checking user's like:", error);
    res.status(500).json({ error: "Failed to check user's like" });
  }
});

app.delete("/RemoveLike", async (req, res) => {
  console.log("DELETE ACTION");
  const userId = req.body.userId;
  const postId = req.body.postId;
  console.log("userId:", userId);
  console.log("postId:", postId);
  try {
    // Fetch the current likes count for the post from the database
    const [post] = await sequelize.query(
      `SELECT * FROM public.posts WHERE id = '${postId}'`
    );

    if (post.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    const currentLikes = post[0].likes || 0;
    // Decrement the likes count and update the database
    const updatedLikes = currentLikes - 1;
    await sequelize.query(
      `UPDATE public.posts SET likes = ${updatedLikes} WHERE id = '${postId}'`
    );

    await sequelize.query(
      `DELETE FROM public."Likes" WHERE "Likes"."userId" = :userId AND "Likes"."postId" = :postId`,
      {
        replacements: { userId, postId },
        type: sequelize.QueryTypes.DELETE,
      }
    );

    res.status(200).json({ message: "Like removed successfully" });
  } catch (error) {
    console.error("Error removing like:", error);
    res.status(500).json({ error: "Failed to remove like" });
  }
});

app.post("/likePost/:id", async (req, res) => {
  const postId = req.params.id;
  const userId = req.body.userId;
  console.log("postId:", postId);
  console.log("userId:", userId);
  try {
    // Fetch the current likes count for the post from the database
    const [post] = await sequelize.query(
      `SELECT * FROM public.posts WHERE id = '${postId}'`
    );

    if (post.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    const currentLikes = post[0].likes || 0;

    // Increment the likes count and update the database
    const updatedLikes = currentLikes + 1;
    await sequelize.query(
      `UPDATE public.posts SET likes = ${updatedLikes} WHERE id = '${postId}'`
    );
    // add like to likes table
    const insertQuery = `
      INSERT INTO public."Likes" ("userId", "postId")
      VALUES ('${userId}', '${postId}')
      RETURNING *;
    `;
    await sequelize.query(insertQuery, {
      type: sequelize.QueryTypes.INSERT,
    });
    res.status(200).json({ message: "Post liked successfully" });
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ error: "Failed to like post" });
  }
});

app.get("/searchtag/:tag", async (req, res) => {
  const { tag } = req.params;
  console.log("tag:", tag);

  try {
    // Fetch tag that matches the search query
    const [tagItem] = await sequelize.query(
      `SELECT * FROM public.tags WHERE name = '${tag}'`
    );

    if (!tagItem || tagItem.length === 0) {
      res.status(404).json({ error: "Tag not found" });
      return;
    }

    const postIds = tagItem[0].posts;
    const cleanedPostIds = postIds
      .replace(/\{|\}|"|\\/g, "") // Remove unnecessary characters
      .split(","); // Split into an array

    const fetchedPosts = [];

    // Fetch the posts that match the tag
    for (const postId of cleanedPostIds) {
      try {
        const [post] = await sequelize.query(
          `SELECT * FROM public.posts WHERE id = '${postId}'`
        );
        if (post && post.length > 0) {
          fetchedPosts.push(post[0]);
        }
      } catch (error) {
        console.error("Error fetching post with ID:", postId, error);
      }
    }

    res.status(200).json({ posts: fetchedPosts });
  } catch (error) {
    console.error("Error searching for posts with tag:", error);
    res.status(500).json({ error: "Failed to search for posts with tag" });
  }
});

app.get("/tags", async (req, res) => {
  try {
    const tags = await sequelize.query(`SELECT * FROM public.tags`);
    res.json(tags);
    console.log("Fetched tags:", tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ error: "Failed to fetch tags" });
  }
});
app.listen(5000, () => {
  console.log("Server is up on port 5000");
});
