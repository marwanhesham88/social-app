"use client"
import React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { CommentsType, PostType } from '@/app/_interfaces/home';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Box, TextField } from '@mui/material';
import myImg from '../../../assets/images/maroo.jpg'


interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

export default function Post({postObject, allComments = false}: { postObject: PostType, allComments: boolean }) {

  const [expanded, setExpanded] = React.useState(false);

  let router = useRouter()

  function handleNavigate(id: string) {
    router.push(`/user/${id}`)
  }

  function handleImg(imgsrc:string) {
    let myAllKeywords = imgsrc.split("/")
    let lastKey = myAllKeywords[myAllKeywords.length - 1]

    if (lastKey === "undefined") {
      return myImg
    }else{
      return imgsrc
    }
  }

  function postDetails(id: string) {
    router.push(`/post/${id}`)
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ width: "100%" , marginBottom: "20px"  }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] , cursor: "pointer" }} aria-label="recipe" onClick={()=> handleNavigate(postObject.user._id)}>
            <Image src={postObject.user.photo} alt={postObject.user.name} width={50} height={50} />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={postObject.user.name}
        subheader={postObject.createdAt}
        titleTypographyProps={{
            sx: {
                cursor: "pointer",
                width: "fit-content"
            },
            onClick: ()=> handleNavigate(postObject.user._id)
        }}
      />
    
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {postObject.body}
        </Typography>
      </CardContent>
      {postObject.image ?  <CardMedia
        component="img"
        height="194"
        image={postObject.image}
        alt="Paella dish"
      /> : ""}
     
      <CardActions sx={{display:"flex", justifyContent:"space-between"}}>
        <IconButton aria-label="add to favorites">
          <ThumbUpIcon />
        </IconButton>
        <IconButton aria-label="comments">
          <QuestionAnswerIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        {/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore> */}
      </CardActions>
      <TextField  fullWidth placeholder='Add Your Comment'/>

      {postObject.comments.length > 0 && allComments == false ? <Box sx={{backgroundColor:"gray"}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] , cursor: "pointer" }} aria-label="recipe" onClick={()=> handleNavigate(postObject.comments[0].commentCreator._id)}>
            <Image  src={handleImg(postObject.comments[0].commentCreator.photo)} alt={postObject.comments[0].commentCreator.name} width={40} height={40} />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={postObject.comments[0].commentCreator.name}
        subheader={postObject.comments[0].createdAt}
        titleTypographyProps={{
            sx: {
                cursor: "pointer",
                width: "fit-content"
            },
            onClick: ()=> handleNavigate(postObject.comments[0].commentCreator._id)
        }}
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {postObject.comments[0].content}
        </Typography>
      </CardContent>
      </Box> : postObject.comments?.map((comment:CommentsType) => <Box key={postObject._id} sx={{backgroundColor:"gray"}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] , cursor: "pointer" }} aria-label="recipe" onClick={()=> handleNavigate(comment.commentCreator._id)}>
            <Image  src={handleImg(comment.commentCreator.photo)} alt={comment.commentCreator.name} width={40} height={40} />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={comment.commentCreator.name}
        subheader={comment.createdAt}
        titleTypographyProps={{
            sx: {
                cursor: "pointer",
                width: "fit-content"
            },
            onClick: ()=> handleNavigate(comment.commentCreator._id)
        }}
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {comment.content}
        </Typography>
      </CardContent>
      </Box>)}

      {postObject.comments.length > 1 && allComments == false ? <Typography sx={{cursor: "pointer"}} component="p" variant="h6" onClick={()=> postDetails(postObject._id)}>
        view more comments..
      </Typography> : ""}

      
      
      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse> */}
    </Card>
  );
}
