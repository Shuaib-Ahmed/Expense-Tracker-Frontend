const year = new Date().getFullYear();
const month = new Date().getMonth() + 1;
const days = new Date(year, month, 0).getDate();

const defaultMonthlyChartData = [];
for (let i = 1; i <= days; i++) {
  defaultMonthlyChartData.push({ label: `${i}`, value: 0 });
}

const defaultYearlyChartData = [
  { label: "Jan", value: 0 },
  { label: "Feb", value: 0 },
  { label: "Mar", value: 0 },
  { label: "Apr", value: 0 },
  { label: "May", value: 0 },
  { label: "Jun", value: 0 },
  { label: "Jul", value: 0 },
  { label: "Aug", value: 0 },
  { label: "Sep", value: 0 },
  { label: "Oct", value: 0 },
  { label: "Nov", value: 0 },
  { label: "Dec", value: 0 },
];

const BaseApiUrl = process.env.REACT_APP_BASE_URL;

const expenseType = [
  "Rent",
  "Grocery",
  "Tution Fee",
  "Loans",
  "Subcriptions",
  "Medical",
  "Others",
];

const initialFormValues = {
  expense_name: "",
  expense_total: "",
  expense_date: "",
  expense_type: "Rent",
  expense_description: "",
};

export {
  BaseApiUrl,
  defaultYearlyChartData,
  defaultMonthlyChartData,
  expenseType,
  initialFormValues,
  year,
  month
};
