import React, { useState } from 'react';
import Head from 'next/head';
import marked from 'marked';
import dompurify from 'dompurify';
import TextareaAutosize from 'react-textarea-autosize';

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
    <React.Fragment>
      <main className="container">
        <Head>
          <title>{title}</title>
        </Head>

        <div className="formPost">
          <section className="view">
            <div
              className={`view__option ${!showPreview && 'active'}`}
              onClick={() => setShowPreview(false)}
            >
              Edit
            </div>
            <div
              className={`view__option ${showPreview && 'active'}`}
              onClick={() => setShowPreview(true)}
            >
              Preview
            </div>
          </section>

          {showPreview && (
            <section className="preview">
              <TextareaAutosize disabled className="preview__title">
                {post.title || 'The title of your post will apper here'}
              </TextareaAutosize>

              <div
                className="preview__content"
                dangerouslySetInnerHTML={{
                  __html: dompurify.sanitize(marked(post.content)),
                }}
              />
            </section>
          )}

          {!showPreview && (
            <div className="form">
              <div className="form__cover">
                <button className="btn-dark">Cover image</button>
              </div>

              <TextareaAutosize
                placeholder="Add your post title here..."
                className="form__title"
                maxLength={125}
                onChange={(event) => handleChange(event)}
                id="title"
              >
                {post.title}
              </TextareaAutosize>

              <div className="form__tags">Add up to 5 tags...</div>

              <div className="form__image">
                <button className="btn-light">Upload image</button>
              </div>

              <TextareaAutosize
                id="content"
                placeholder="Write you post content here..."
                className="form__body"
                onChange={(event) => handleChange(event)}
              >
                {post.content}
              </TextareaAutosize>
            </div>
          )}
        </div>

        <aside className="aside">
          <button className="btn-light btn__publish">Publish!</button>
        </aside>
      </main>
    </React.Fragment>
  );
};

export default PostForm;
