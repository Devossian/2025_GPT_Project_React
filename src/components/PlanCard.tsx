import "../styles/Payment.css";

interface Plan {
  name: string;
  price: string;
  features: string[];
  buttonText: string;
  buttonDisabled: boolean;
}

const PlanCard = ({ plan, isHighlighted }: { plan: Plan; isHighlighted: boolean }) => {
  return (
    <div className={`plan-card ${isHighlighted ? "highlighted" : ""}`}>
      <h2 className="plan-name">{plan.name}</h2>
      <p className="plan-price">{plan.price} <span className="price-subtext"></span></p>
      <ul className="plan-features">
        {plan.features.map((feature, i) => (
          <li key={i} className="feature-item">✅ {feature}</li>
        ))}
      </ul>
      <button className={`plan-button ${plan.buttonDisabled ? "disabled" : ""}`} disabled={plan.buttonDisabled}>
        {plan.buttonText}
      </button>
    </div>
  );
};

export default PlanCard;
