import { React, useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function BudgetControl({ budget, gastos }) {
  const [porcentaje, setPorcentaje] = useState(0);
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );

    const totalDisponible = budget - totalGastado;
    const nuevoPorcentaje = (
      ((budget - totalDisponible) / budget) *
      100
    ).toFixed(2);
    setPorcentaje(nuevoPorcentaje);
    setDisponible(totalDisponible);
    setGastado(totalGastado);
  }, [gastos]);

  const formatterMoney = (money) => {
    return money.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({ pathColor: "#fdaf16" })}
          value={porcentaje}
          text={`${porcentaje} % Gastado`}
        />
      </div>

      <div className="contenido-presupuesto">
        <p>
          <span>Presupuesto: </span>
          {formatterMoney(Number(budget))}
        </p>

        <p>
          <span>Disponible: </span>
          {formatterMoney(Number(disponible))}
        </p>

        <p>
          <span>Gastado: </span>
          {formatterMoney(Number(gastado))}
        </p>
      </div>
    </div>
  );
}

export default BudgetControl;
