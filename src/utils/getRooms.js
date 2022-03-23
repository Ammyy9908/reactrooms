import axios from "axios";
const getRooms = async () => {
  try {
    const r = await axios.get(
      `https://group-chat-serverreact.herokuapp.com/roomapi/rooms`
    );
    return r.data;
  } catch (e) {
    return null;
  }
};

export default getRooms;
