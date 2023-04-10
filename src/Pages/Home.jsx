import React, { useState } from 'react'
import CardComponent from '../components/cardcomponent'
import { Box, Grid } from '@mui/material';
import { json } from 'react-router-dom';


const initalCardArr = [
  {
    id: 1,
    img: "https://picsum.photos/200/300",
    title: "id 1",
    price: 112,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non lobortis sem. Fusce dapibus est in est aliquet, sed gravida nibh malesuada. Etiam malesuada magna ut velit bibendum, id dignissim nisl iaculis. Quisque malesuada, lorem eget congue venenatis, mi enim luctus odio, vel finibus leo libero eu risus. Maecenas posuere risus et nibh feugiat, vitae pulvinar justo pharetra. In eu neque lacus. Aliquam blandit mauris in commodo fringilla.",
  },
  {
    id: 2,
    img: "https://picsum.photos/200/300",
    title: "id 2",
    price: 112,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non lobortis sem. Fusce dapibus est in est aliquet, sed gravida nibh malesuada. Etiam malesuada magna ut velit bibendum, id dignissim nisl iaculis. Quisque malesuada, lorem eget congue venenatis, mi enim luctus odio, vel finibus leo libero eu risus. Maecenas posuere risus et nibh feugiat, vitae pulvinar justo pharetra. In eu neque lacus. Aliquam blandit mauris in commodo fringilla.",
  },
  {
    id: 3,
  
    title: "id 3",
    price: 112,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non lobortis sem. Fusce dapibus est in est aliquet, sed gravida nibh malesuada. Etiam malesuada magna ut velit bibendum, id dignissim nisl iaculis. Quisque malesuada, lorem eget congue venenatis, mi enim luctus odio, vel finibus leo libero eu risus. Maecenas posuere risus et nibh feugiat, vitae pulvinar justo pharetra. In eu neque lacus. Aliquam blandit mauris in commodo fringilla.",
  },
  {
    id: 4,
    img: "https://picsum.photos/200/300",
    title: "id 4",
    price: 112,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non lobortis sem. Fusce dapibus est in est aliquet, sed gravida nibh malesuada. Etiam malesuada magna ut velit bibendum, id dignissim nisl iaculis. Quisque malesuada, lorem eget congue venenatis, mi enim luctus odio, vel finibus leo libero eu risus. Maecenas posuere risus et nibh feugiat, vitae pulvinar justo pharetra. In eu neque lacus. Aliquam blandit mauris in commodo fringilla.",
  },
];


const Home = () => {
  const [cardsArr,setCardArr] = useState(initalCardArr)
  const handleDeleteFromInitialCardsArr = (id)=> {
    let newCardArr = JSON.parse(JSON.stringify(cardsArr))
   newCardArr = newCardArr.filter((item) => item.id != id);
   setCardArr(newCardArr)
  }
  return (
    <Box>
      <Grid container spacing={2}>
        {cardsArr.map((item) => (
          <Grid item xs={4} key={item.id + Date.now()}>
            <CardComponent {...item}
            onDelete={handleDeleteFromInitialCardsArr}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Home