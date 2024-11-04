import Restaurant from "../restaurant-item/restaurant";
interface propsType {
  posts?: Array<object>;
  loading: boolean;
}

function RestaurantContainer(props: propsType) {
  let { posts, loading } = props;
  if (posts?.length == 0 || !posts || loading) {
    return <></>;
  }
  return (
    <>
      {posts.map((e) => {
        return <Restaurant myvalue={e} />;
      })}
    </>
  );
}
export default RestaurantContainer;
