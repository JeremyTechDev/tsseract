import { Box, Container, Grid, Typography } from '@mui/material';

import useStyles from './styles';

const TWEETS = [
  () => (
    <blockquote className="twitter-tweet" data-conversation="none">
      <p lang="en" dir="ltr">
        I’m a 19.
        <br />
        Self-taught software engineer at a top media company in the US.
        <br />
        Mentored by an Apple senior developer. <br />
        Always in a{' '}
        <a href="https://twitter.com/hashtag/100DaysOfCode?src=hash&amp;ref_src=twsrc%5Etfw">
          #100DaysOfCode
        </a>{' '}
        challenge.
        <br />
        If you wanna be mentored, just click on my profile, see what I do, and
        if you like it, just DM me and let’s pair!
      </p>
      &mdash; Jeremy (@AskJere){' '}
      <a href="https://twitter.com/AskJere/status/1438495378941353998?ref_src=twsrc%5Etfw">
        September 16, 2021
      </a>
    </blockquote>
  ),
  () => (
    <blockquote className="twitter-tweet">
      <p lang="en" dir="ltr">
        Plan to start{' '}
        <a href="https://twitter.com/hashtag/freelancing?src=hash&amp;ref_src=twsrc%5Etfw">
          #freelancing
        </a>
        ?<br />
        Here is my advice to get your first client 🧵👇{' '}
        <a href="https://t.co/GV7AcutB70">pic.twitter.com/GV7AcutB70</a>
      </p>
      &mdash; Jeremy (@AskJere){' '}
      <a href="https://twitter.com/AskJere/status/1439286297789702147?ref_src=twsrc%5Etfw">
        September 18, 2021
      </a>
    </blockquote>
  ),
  () => (
    <blockquote className="twitter-tweet">
      <p lang="en" dir="ltr">
        ❌ What job security is *NOT*:
        <br />- Knowing you will not lose the job you have because you do well
        at it.
        <br />✅ What job security *IS*:
        <br />- Knowing you will lose your job, and not starve.
      </p>
      &mdash; Jeremy (@AskJere){' '}
      <a href="https://twitter.com/AskJere/status/1438852739753119748?ref_src=twsrc%5Etfw">
        September 17, 2021
      </a>
    </blockquote>
  ),
  () => (
    <blockquote className="twitter-tweet">
      <p lang="en" dir="ltr">
        Relax 🧘‍♂️🧘‍♀️
        <br />
        Take some time a day to just sit quietly and focus on your breath.
        <br />
        CEOs, high-performance athletes and business owners do this to be more
        productive in their day!
        <br />
        Wanna know more? 🧵👇
      </p>
      &mdash; Jeremy (@AskJere){' '}
      <a href="https://twitter.com/AskJere/status/1438556396644143105?ref_src=twsrc%5Etfw">
        September 16, 2021
      </a>
    </blockquote>
  ),
  () => (
    <blockquote className="twitter-tweet">
      <p lang="en" dir="ltr">
        <a href="https://twitter.com/TheJackForge?ref_src=twsrc%5Etfw">
          @TheJackForge
        </a>{' '}
        recently made a thread about growing on Twitter.
        <br />I learned I must set 3 contents buckets, those will be:
        <br />- Coding as a self-taught developer
        <br />- Growing on Twitter
        <br />- Releasing an Open Source Project (soon!)
        <br />
        That&#39;s the valuable content you&#39;ll see on my account!
      </p>
      &mdash; Jeremy (@AskJere){' '}
      <a href="https://twitter.com/AskJere/status/1438185593675079690?ref_src=twsrc%5Etfw">
        September 15, 2021
      </a>
    </blockquote>
  ),
  () => (
    <blockquote className="twitter-tweet">
      <p lang="en" dir="ltr">
        Want to give a modern look to your site?
        <br />
        Try playing with some CSS gradient with this great tool!
        <a href="https://t.co/gh1eBx3EXy">https://t.co/gh1eBx3EXy</a>{' '}
        <a href="https://t.co/BrRbbpN02h">pic.twitter.com/BrRbbpN02h</a>
      </p>
      &mdash; Jeremy (@AskJere){' '}
      <a href="https://twitter.com/AskJere/status/1439214192645578753?ref_src=twsrc%5Etfw">
        September 18, 2021
      </a>
    </blockquote>
  ),
  () => (
    <blockquote className="twitter-tweet">
      <p lang="en" dir="ltr">
        Every big creator advices you to do it.
        <br />
        You still have doubts on why you should?
        <br />
        Join me as I build mine. <br />
        You’ll find valuable content at{' '}
        <a href="https://twitter.com/AskJere?ref_src=twsrc%5Etfw">
          @AskJere
        </a>{' '}
        🙌 <a href="https://t.co/fBu9YvTLWz">https://t.co/fBu9YvTLWz</a>
      </p>
      &mdash; Jeremy (@AskJere){' '}
      <a href="https://twitter.com/AskJere/status/1439198197507928064?ref_src=twsrc%5Etfw">
        September 18, 2021
      </a>
    </blockquote>
  ),
];

const Tweets = () => {
  const classes = useStyles();

  return (
    <Grid item container>
      <Container maxWidth="lg">
        <Grid container alignItems="flex-end" spacing={1}>
          <Grid item>
            <Typography variant="h3">Stay tunned on Twitter</Typography>
          </Grid>

          <Grid item>
            <a
              href="https://twitter.com/AskJere?ref_src=twsrc%5Etfw"
              className="twitter-follow-button"
              data-size="large"
              data-show-count="false"
            >
              Follow @AskJere
            </a>
          </Grid>
        </Grid>
      </Container>

      <Box className={classes.tweets}>
        {TWEETS.map((Tweet, i) => (
          <Tweet key={Tweet.name + i} />
        ))}
      </Box>
    </Grid>
  );
};

export default Tweets;
