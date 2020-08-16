import React from 'react';
import Head from 'next/head';

import '../../../scss/postForm.scss';

interface Props {
  title: string;
}

const PostForm: React.FC<Props> = ({ title }) => {
  return (
    <div className="container">
      <Head>
        <title>{title}</title>
      </Head>
      <div className="form">
        <div className="form__cover">
          <button className="btn">Cover image</button>
        </div>

        <textarea
          placeholder="Add your post title here..."
          className="form__title"
          maxLength={55}
        />

        <div className="form__tags">Add up to 5 tags...</div>

        <div className="form__image">
          <button className="btn">Upload image</button>
        </div>

        <textarea
          placeholder="Write you post content here..."
          className="form__body"
        />

        <div className="form__view">
          <div className="form__view--option active">
            <span>Edit</span>
          </div>
          <div className="form__view--option">
            <span>Preview</span>
          </div>
        </div>
      </div>
      <div className="guide"></div>
    </div>
  );
};

export default PostForm;
