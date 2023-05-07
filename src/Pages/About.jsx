import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import { CardMedia } from "@mui/material";

const About = () => {
  return (
    <Grid container spacing={4} sx={{ padding: 4 }}>
      <Grid item xs={12}>
        <Typography variant="h3" align="center">
          About Us
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper
          sx={{ padding: 2, margin: "auto", maxWidth: 500, marginBottom: 4 }}
        >
          <Typography variant="h4" gutterBottom>
            Our Story
          </Typography>
          <Typography variant="body1" align="justify" gutterBottom>
            At our second-hand sales website, we're passionate about bringing
            high-quality, affordable products to our customers. We believe that
            everyone deserves to have access to great items, no matter their
            budget, and that's why we've created a marketplace that's accessible
            to everyone. Our team is made up of experienced sellers and buyers
            who are experts in the world of second-hand items. We know what
            makes a great product, and we're committed to only offering the best
            to our customers. That's why we carefully curate and inspect each
            and every item that's sold on our website. We want to make sure that
            every product meets our high standards for quality and authenticity,
            so you can shop with confidence. But we're not just about selling
            great products. We're also dedicated to building a community of
            like-minded individuals who share our passion for second-hand
            shopping. We believe that buying and selling second-hand items is
            not only a great way to save money, but it's also good for the
            environment. By giving items a second life, we're helping to reduce
            waste and promote sustainability. So if you're looking for amazing
            deals on high-quality second-hand items, look no further than our
            website. We're always happy to hear
            from our customers and we're committed to providing the best
            possible shopping experience.
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper
          sx={{ padding: 2, margin: "auto", maxWidth: 500, marginBottom: 4 }}
        >
          <CardMedia
            component="img"
            height="350"
            image="https://source.unsplash.com/random/800x600?second-hand+sales"
            alt="CEO"
          />
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper
          sx={{ padding: 2, margin: "auto", maxWidth: 500, marginBottom: 4 }}
        >
          <Avatar
            alt="Team member 1"
            sx={{ width: 160, height: 160, margin: "auto" }}
          />
          <Typography variant="h5" align="center" gutterBottom>
            Jane Doe
          </Typography>
          <Typography variant="body1" align="justify">
            Jane Doe is our Lead Web Developer and has been with our company for
            over 7 years. She brings a wealth of experience and technical
            expertise to our team, and has been instrumental in the development
            and maintenance of our website. Jane is responsible for leading our
            web development team, overseeing the design and implementation of
            new features and functionality, and ensuring that our website is
            up-to-date and running smoothly. She works closely with our
            marketing team to ensure that our website reflects our brand and
            communicates our message effectively. Jane is a highly skilled
            developer and is always up-to-date with the latest web technologies
            and trends. She is a creative problem solver and is always looking
            for ways to improve the user experience on our website.
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper
          sx={{ padding: 2, margin: "auto", maxWidth: 500, marginBottom: 4 }}
        >
          <Avatar
            alt="Team member 2"
            sx={{ width: 160, height: 160, margin: "auto" }}
          />
          <Typography variant="h5" align="center" gutterBottom>
            Jack Smith
          </Typography>
          <Typography variant="body1" align="justify">
            Jack Smith is our Marketing Director and brings over 10 years of
            experience in the marketing industry to our team. He is a creative
            thinker with a passion for developing innovative marketing
            strategies that deliver results. Jack is responsible for overseeing
            our marketing efforts, including brand strategy, social media
            management, and advertising campaigns. He works closely with our
            sales team to develop marketing campaigns that drive traffic to our
            website and increase sales. Jack's dedication to his work and
            expertise in the field have been instrumental in the success of our
            business. He is a valued member of our team, and we are grateful for
            his contributions.
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper
          sx={{ padding: 2, margin: "auto", maxWidth: 500, marginBottom: 4 }}
        >
          <Avatar
            alt="Team member 3"
            sx={{ width: 160, height: 160, margin: "auto" }}
          />
          <Typography variant="h5" align="center" gutterBottom>
            Jill Johnson
          </Typography>
          <Typography variant="body1" align="justify">
            Jill Johnson is our Operations Manager and has been with our company
            for over 5 years. She brings a wealth of knowledge and experience in
            operations management to our team, and has been instrumental in
            streamlining our processes and improving our efficiency. Jill is
            responsible for overseeing our day-to-day operations, including
            inventory management, order fulfillment, and customer service. She
            works closely with our sales team to ensure that our customers
            receive the highest level of service and support. Jill is a problem
            solver by nature and has a keen eye for detail. She is always
            looking for ways to improve our operations and find new
            efficiencies. Her dedication and expertise have been essential to
            the success of our business, and we are lucky to have her as part of
            our team.
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default About;
