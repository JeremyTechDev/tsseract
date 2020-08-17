import React, { useState } from 'react';
import Head from 'next/head';
import marked from 'marked';
import dompurify from 'dompurify';

import '../../../scss/postForm.scss';

interface Props {
  title: string;
}

const PostForm: React.FC<Props> = ({ title }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [post, setPost] = useState({ title: '', tags: [], content: '' });

  const handleChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPost(Object.assign(post, { [target.id]: target.value }));
  };

  return (
    <div className="container">
      <Head>
        <title>{title}</title>
      </Head>
      <div className="form">
        <div className="form__view">
          <div
            className={`form__view--option ${!showPreview && 'active'}`}
            onClick={() => setShowPreview(false)}
          >
            Edit
          </div>
          <div
            className={`form__view--option ${showPreview && 'active'}`}
            onClick={() => setShowPreview(true)}
          >
            Preview
          </div>
        </div>

        {(showPreview && (
          <div
            className="form__body preview"
            dangerouslySetInnerHTML={{
              __html: dompurify.sanitize(marked(post.content)),
            }}
          />
        )) || (
          <React.Fragment>
            <div className="form__cover">
              <button className="btn">Cover image</button>
            </div>

            <textarea
              placeholder="Add your post title here..."
              className="form__title"
              maxLength={55}
              onChange={(event) => handleChange(event)}
              id="title"
            />

            <div className="form__tags">Add up to 5 tags...</div>

            <div className="form__image">
              <button className="btn">Upload image</button>
            </div>

            <textarea
              id="content"
              placeholder="Write you post content here..."
              className="form__body"
              onChange={(event) => handleChange(event)}
            >
              {post.content}
            </textarea>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default PostForm;
