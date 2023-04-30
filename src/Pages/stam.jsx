import { useState, useEffect } from "react";
import axios from "axios";
import { Avatar, IconButton, Box } from "@material-ui/core";

const stam = () => {
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    const fetchAvatarUrl = async () => {
      try {
        const { data } = await axios.get("/users/userInfo");
        if (data.imageAlt && data.imageUrl) {
          setAvatarUrl(data.imageUrl);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAvatarUrl();
  }, []);

  return (
    <AppBar>
      <Toolbar>
        <Container>
          <Box>
            <IconButton>
              <Avatar src={avatarUrl} />
            </IconButton>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default stam;
