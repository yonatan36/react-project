// Home page component
const Home = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const { data } = await axios.get("/cards/cards");
        setCards(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCards();
  }, []);

  const toggleLike = async (cardId) => {
    try {
      const { data } = await axios.put(`/cards/cards/${cardId}/like`, {
        userId: payload._id,
      });
      setLikedCards(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {cards.map((card) => (
        <div key={card.id}>
          {likedCards.some((c) => c.id === card.id) ? (
            <FavoriteIcon onClick={() => toggleLike(card.id)} />
          ) : (
            <FavoriteBorderIcon onClick={() => toggleLike(card.id)} />
          )}
          <Card {...card} />
        </div>
      ))}
    </div>
  );
};




  const handleSubmit = async (ev) => {
    try {
      const joiRespone = validetionProfileSchema(inputState);
      setErrorFromJoi(joiRespone);
      if (joiRespone) {
        toast.error(joiRespone);
        console.log("prifile", joiRespone);
        return;
      }

      // Set loading state to true
      setIsLoading(true);

      await axios.put("/users/userInfo/", inputState);

      setTimeout(() => {
        setIsLoading(false);
        navigate(ROUTES.HOME);
        toast.success("The changes were successful");
      }, 3000);
    } catch (error) {}
  };