import React, { useState } from 'react';
import Head from 'next/head';

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
        {(showPreview && <h1>Hi</h1>) || (
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
            />
          </React.Fragment>
        )}

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
      </div>
      <div className="guide"></div>
    </div>
  );
};

export default PostForm;
