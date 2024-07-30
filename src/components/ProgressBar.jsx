const ProgressBar = ({ spent, budgeted }) => {
  const fraction = (spent / budgeted) * 100;
  const tens = Math.floor(fraction / 10);
  const units = fraction % 10;
  let percentage;
  let progressBarStyle = " bg-green-500 rounded-md";

  if (units >= 5) {
    percentage = (tens + 1) * 10;
  } else {
    percentage = tens * 10;
  }

  const width = "w-" + String(percentage) + "%";
  console.log(width);
  progressBarStyle = width + progressBarStyle;
  console.log(progressBarStyle);

  if (fraction > 100) {
    return <div className="w-full bg-red-500 rounded-md">.</div>;
  }
  return <div className={progressBarStyle}>.</div>;
};

export default ProgressBar;
