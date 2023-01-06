class BoardService {
  async getList(data: pageData) {
    return await axios
      .post("/boardList", data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  async getDatail(data: boardDetail) {
    return await axios
      .post("/boardDetail", data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
export default new BoardService();
