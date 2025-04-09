import * as React from "react";

function Home() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "70px",
        marginTop: "140px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#D9D9D9",
          border: "none",
          borderRadius: "10px",
          fontSize: "22px",
          width: "200px",
          height: "150px",
        }}
      >
       
        Salas
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#D9D9D9",
          border: "none",
          borderRadius: "10px",
          fontSize: "22px",
          width: "200px",
          height: "150px",
        }}
      >
        Reservas
      </div>
    </div>
  );
}

export default Home;
