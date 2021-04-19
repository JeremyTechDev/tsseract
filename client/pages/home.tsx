import { NextPage, NextPageContext } from 'next';
import { Grid } from '@material-ui/core';

import ChatLayout from '../components/Layout/Chat';
import TagBarLayout from '../components/Layout/TagBar';
import TagCard from '../components/Tag/Card';
import MessagePost from '../components/MessagePost';
import { authInitialProps } from '../lib/auth';
import { getRequest } from '../lib/fetch';
import { iPost, iTag } from '../@types';

interface Props {
	posts: iPost[];
	tags: { tag: iTag; post: iPost }[];
}

const Feed: NextPage<Props> = ({ posts, tags }) => {
	return (
		<>
			<Grid container>
				<Grid item sm={3}>
					<TagBarLayout>
						{tags.map((tag) => (
							<TagCard tag={tag} />
						))}
					</TagBarLayout>
				</Grid>

				<Grid item sm={9}>
					<ChatLayout>
						<Grid container direction="column">
							{posts.map((post, i) => (
								<MessagePost key={post._id} out={i === 48} post={post} />
							))}
						</Grid>
					</ChatLayout>
				</Grid>
			</Grid>
		</>
	);
};

export const getServerSideProps = async (ctx: NextPageContext) => {
	authInitialProps(true)(ctx);
	const posts = await getRequest('/posts').then((res) => res.json());
	const tags = await getRequest('/tags').then((res) => res.json());

	return { props: { posts, tags } };
};

export default Feed;
