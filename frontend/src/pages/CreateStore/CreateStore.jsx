import React, {useState} from 'react';
import TopStores from '../../components/TopStores/TopStores';
import api from "../../api/index";

function CreateStore() {
  const [store, setStoreData] = useState();
  const [image, setImage] = useState(null);


  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!store.storeName || !store.description || !image) {
      alert('Please fill all fields and upload an image.');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = async () => {
      const base64Image = reader.result.split(',')[1];

      try {
        const response = await api.store.createStore({
          store,
          image: base64Image,
        });
        console.log('Store created successfully:', response.data);
      } catch (error) {
        console.error('Error creating store:', error);
      }
    };
  };


    const renderCreateStoreForm = () => (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Store Name</label>
            <input
              type="text"
              name="storeName"
              value={store?.storeName}
              onChange={(e) =>
                setStoreData({ ...store, storeName: e.target.value })
              }
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Description:</label>
            <input
              type="text"
              name="description"
              value={store?.description}
              onChange={(e) =>
                setStoreData({ ...store, description: e.target.value })
              }
              required
              style={styles.input}
            />
          </div>
          <div>
        <label style={styles.label}>
          Upload Store Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
      </div>
          <div style={styles.buttonContainer}>
            <button type="submit"  className="btn btn-primary w-100" style={{backgroundColor: "#1A2529", border: "none"}}>
              Create Store
            </button> 
          </div>
        </form>
      );
    
  return (
    <>
      <div className="hero-section" style={{height: "100vh"}}>
        <div class="header">
        <div className="hero-text">
      <h1>Create Your Store</h1>
    </div>
        </div>
    <div className="hero-image">
      {renderCreateStoreForm()}
    </div>
  </div>
    </>

  

  );
}

const styles = {
  container: {
    padding: "20px"
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  createButton: {
    backgroundColor: "#FF9900",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    display: "block",
  },
  roomCard: {
    border: "1px solid #ccc",
    padding: "20px",
    margin: "10px",
    borderRadius: "5px",
    width: "calc(33.333% - 20px)",
    boxSizing: "border-box",
  },
  roomsContainer: {
    display: "flex",
    flexWrap: "wrap"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "300px",
    margin: "0 auto",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  label: {
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  cancelButton: {
    backgroundColor: "#f44336",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  editButton: {
    backgroundColor: "#FF9900",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
};


export default CreateStore;
