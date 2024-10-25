import {useState} from "react";
import axios from "axios";
import {saveAs} from "file-saver";

import "./App.css";

const App = () => {
  const [data, setData] = useState({
    name: "",
    receiptId: 0,
    price1: 0,
    price2: 0,
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setData({...data, [name]: value});
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:5000/create-pdf", data)
      .then(() =>
        axios.get(`http://localhost:5000/fetch-pdf/${data.receiptId}`, {
          responseType: "blob",
        })
      )
      .then((res) => {
        const pdfBlob = new Blob([res.data], {type: "application/pdf"});
        saveAs(pdfBlob, `${data.receiptId}.pdf`);
      });
  };

  return (
    <div className="app">
      <div className="container">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter customer name"
          onChange={handleChange}
        />
        <input
          type="text"
          id="receiptId"
          name="receiptId"
          placeholder="Enter customer receipt id"
          onChange={handleChange}
        />
        <input
          type="text"
          id="price1"
          name="price1"
          placeholder="Enter product 1 price"
          onChange={handleChange}
        />
        <input
          type="text"
          id="price2"
          name="price2"
          placeholder="Enter product 2 price"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Download PDF</button>
      </div>
    </div>
  );
};

export default App;
