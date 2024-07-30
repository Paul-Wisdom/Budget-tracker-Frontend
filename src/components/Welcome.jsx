import { NavBar } from "./NavBar";
const Welcome = () => {
  return (
    <div className="flex flex-col">
      <NavBar />
      <h1 className="text-3xl font-bold">
        Welcome to the monthly budget Tracker.
      </h1>
      <div className="mt-3 mx-4">
      <p className="text-xl bold">
        The monthly budget tracker is an application that stores and provides
        updates of a user's income and expenses on a monthly basis. It's key
        features include;
      </p>
      <ul className="list-disc bold text-xl pl-5">
        <li>User sign up with email verification</li>
        <li>Password Change</li>
        <li>
          Budget creation on sign up and subsequently at beginning of a new
          month
        </li>
        <li> Income and expense creation</li>
        <li>Transactions storage</li>
        <li> Display of income and expenses in Pie, Doughnut and Bar Charts</li>
        <li>
          Generation of budget statements including all entered transactions,
          income, expenses and charts in a PDF sent to user's mail{" "}
        </li>
      </ul>
      <h2 className="font-bold text-2xl">Coming soon...</h2>
      <ul className="list-disc bold text-xl pl-5">
        <li>Trransaction page Pagination</li>
        <li>Updated UI</li>
        <li>OCR</li>
      </ul>
      </div>
      <div>
        <p className="hidden w-0% w-10% w-20% w-30% w-40% w-50% w-60% w-70% w-80% w-90% w-100%">
          hidden
        </p>
      </div>
    </div>
  );
};

export { Welcome };
