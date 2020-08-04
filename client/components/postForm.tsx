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
          <button>Cover image</button>
        </div>
        <span
          placeholder="Add your post title here..."
          className="form__title"
          contentEditable
          role="textbox"
          //   maxLength={55}
        >
          Add up to 5 tags...
        </span>
        <div className="form__tags">Add up to 5 tags...</div>
        <div className="form__body"></div>
        <div className="form__image"></div>
      </div>
      <div className="guide"></div>
    </div>
  );
};

export default PostForm;
