// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { Button, TextField, Container, Typography } from '@mui/material';

// const EMIForm = () => {
//   const { register, handleSubmit, setValue, formState: { errors } } = useForm();
//   const [emi, setEMI] = useState("");
//   const [startDate, setStartDate] = useState("");

//   const calculateEMI = (data) => {
//     const start = new Date(data.startDate);
//     const end = new Date(data.endDate);
//     const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

//     const emiAmount = parseFloat(data.amount) / months;

//     console.log(parseFloat(data.amount), "amount", months,"moths", emiAmount.toFixed(2),"emi");

//     setEMI(emiAmount.toFixed(2)>0?emiAmount.toFixed(2):0);
//   };

//   const handleStartDateChange = (event) => {
//     setStartDate(event.target.value);
//     setValue("startDate", event.target.value);
//   };

//   return (
//     <Container sx={{ display:"grid", gap:2 }} component="form" onSubmit={handleSubmit(calculateEMI)}>
//       <Typography variant="h4">EMI Calculator</Typography>
//       <TextField
//         label="Amount"
//         type="number"
//         {...register("amount", { required: "Amount is required" })}
//         error={Boolean(errors.amount)}
//         helperText={errors.amount?.message}
//       />
//       <TextField
//         label="Start Date"
//         type="date"
//         InputLabelProps={{ shrink: true }}
//         {...register("startDate", { required: "Start date is required" })}
//         error={Boolean(errors.startDate)}
//         helperText={errors.startDate?.message}
//         onChange={handleStartDateChange}
//       />
//       <TextField
//         label="End Date"
//         type="date"
//         InputLabelProps={{ shrink: true }}
//         {...register("endDate", { required: "End date is required" })}
//         error={Boolean(errors.endDate)}
//         helperText={errors.endDate?.message}
//         inputProps={{
//           min: startDate // The earliest date that can be chosen is the start date
//         }}
//       />
//       <Button variant="contained" color="primary" type="submit">
//         Calculate EMI
//       </Button>
//       {emi && <Typography variant="h6">EMI Amount: { new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(emi) }</Typography>}
//     </Container>
//   );
// };

// export default EMIForm;

// 2nd component

// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { Button, TextField, Container, Typography } from '@mui/material';

// const EMIForm = () => {
//   const { register, handleSubmit, setValue, formState: { errors } } = useForm();
//   const [emi, setEMI] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [timeSlots, setTimeSlots] = useState([]);

//   const calculateEMI = (data) => {
//     const start = new Date(data.startDate);
//     const end = new Date(data.endDate);
//     const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

//     const emiAmount = Math.ceil(parseFloat(data.amount) / months);

//     setEMI(emiAmount > 0 ? emiAmount : 0);
//   };

//   const handleStartDateChange = (event) => {
//     setStartDate(event.target.value);
//     setValue("startDate", event.target.value);
//   };

//   const handleTimeSlot = (data) => {
//     const newSlot = {
//       start: data.startTime,
//       end: new Date(new Date().setHours(new Date(data.startTime).getHours() + parseFloat(data.duration) * 2)).toISOString().substr(11, 5)
//     };

//     for (let slot of timeSlots) {
//       if ((newSlot.start >= slot.start && newSlot.start <= slot.end) || (newSlot.end >= slot.start && newSlot.end <= slot.end)) {
//         alert("Time slots are overlapping");
//         return;
//       }
//     }

//     setTimeSlots([...timeSlots, newSlot]);
//   };

//   return (
//     <Container sx={{ display:"grid", gap:2 }} component="form" onSubmit={handleSubmit(calculateEMI)}>
//       <Typography variant="h4">EMI Calculator</Typography>
//       <TextField
//         label="Amount"
//         type="number"
//         {...register("amount", { required: "Amount is required" })}
//         error={Boolean(errors.amount)}
//         helperText={errors.amount?.message}
//       />
//       <TextField
//         label="Start Date"
//         type="date"
//         InputLabelProps={{ shrink: true }}
//         {...register("startDate", { required: "Start date is required" })}
//         error={Boolean(errors.startDate)}
//         helperText={errors.startDate?.message}
//         onChange={handleStartDateChange}
//       />
//       <TextField
//         label="End Date"
//         type="date"
//         InputLabelProps={{ shrink: true }}
//         {...register("endDate", { required: "End date is required" })}
//         error={Boolean(errors.endDate)}
//         helperText={errors.endDate?.message}
//         inputProps={{
//           min: startDate // The earliest date that can be chosen is the start date
//         }}
//       />
//       <Button variant="contained" color="primary" type="submit">
//         Calculate EMI
//       </Button>
//       {emi && <Typography variant="h6">EMI Amount: { new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(emi) }</Typography>}
//       <Typography variant="h4">Time Slot Management</Typography>
//       <TextField
//         label="Start Time"
//         type="time"
//         {...register("startTime", { required: "Start time is required" })}
//         error={Boolean(errors.startTime)}
//         helperText={errors.startTime?.message}
//       />
//       <TextField
//         label="Duration"
//         type="number"
//         step="0.5"
//         {...register("duration", { required: "Duration is required" })}
//         error={Boolean(errors.duration)}
//         helperText={errors.duration?.message}
//       />
//       <Button variant="contained" color="primary" onClick={handleSubmit(handleTimeSlot)}>
//         Add Time Slot
//       </Button>
//       {timeSlots.map((slot, index) => (
//         <Typography key={index}>Slot {index + 1}: {slot.start} - {slot.end}</Typography>
//       ))}
//     </Container>
//   );
// };

// export default EMIForm;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, TextField, Container, Typography } from "@mui/material";

const EMIForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [emi, setEMI] = useState("");
  const [startDate, setStartDate] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);

  const calculateEMI = (data) => {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());
    const totalAmount = Math.floor(parseFloat(data.amount));
    const emiAmount = Math.floor(totalAmount / months);
    const lastEMI = totalAmount - emiAmount * (months - 1);

    setEMI({ monthly: emiAmount, last: lastEMI });

    console.log(
      emiAmount,
      "emiAmount",
      lastEMI,
      "lastEMI",
      totalAmount,
      "totalAmount",
      months,
      "months"
    );
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    setValue("startDate", event.target.value);
  };

  const handleTimeSlot = (data) => {
    const startTime = new Date(`1970-01-01T${data.startTime}`);
    const endTime = new Date(
      startTime.getTime() + parseFloat(data.duration) * 1800000
    );
    const newSlot = {
      start: startTime.toISOString().substr(11, 5),
      end: endTime.toISOString().substr(11, 5),
    };

    if (
      timeSlots.some(
        (slot) =>
          (newSlot.start >= slot.start && newSlot.start < slot.end) ||
          (newSlot.end > slot.start && newSlot.end <= slot.end) ||
          (slot.start >= newSlot.start && slot.start < newSlot.end) ||
          (slot.end > newSlot.start && slot.end <= newSlot.end)
      )
    ) {
      alert("Time slots are overlapping");
      return;
    }

    setTimeSlots([...timeSlots, newSlot]);
  };

  return (
    <Container
      sx={{ display: "grid", gap: 2 }}
      component="form"
      onSubmit={handleSubmit(calculateEMI)}
    >
      {/* <Container
        sx={{ display: "grid", gap: 2 }}
        component="form"
        onSubmit={handleSubmit(calculateEMI)}
      > */}
      <Typography variant="h4">EMI Calculator</Typography>
      <TextField
        label="Amount"
        type="number"
        {...register("amount", { required: "Amount is required" })}
        error={Boolean(errors.amount)}
        helperText={errors.amount?.message}
      />
      <TextField
        label="Start Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        {...register("startDate", { required: "Start date is required" })}
        error={Boolean(errors.startDate)}
        helperText={errors.startDate?.message}
        onChange={handleStartDateChange}
      />
      <TextField
        label="End Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        {...register("endDate", { required: "End date is required" })}
        error={Boolean(errors.endDate)}
        helperText={errors.endDate?.message}
        inputProps={{
          min: startDate, // The earliest date that can be chosen is the start date
        }}
      />
      <Button variant="contained" color="primary" type="submit">
        Calculate EMI
      </Button>
      <Typography variant="h4">Time Slot Management</Typography>
      <TextField
        label="Start Time"
        type="time"
        {...register("startTime", { required: "Start time is required" })}
        error={Boolean(errors.startTime)}
        helperText={errors.startTime?.message}
      />
      <TextField
        label="Duration"
        type="number"
        step="0.5"
        {...register("duration", { required: "Duration is required" })}
        error={Boolean(errors.duration)}
        helperText={errors.duration?.message}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit(handleTimeSlot)}
      >
        Add Time Slot
      </Button>
      {timeSlots.map((slot, index) => (
        <Typography key={index}>
          Slot {index + 1}: {slot.start} - {slot.end}
        </Typography>
      ))}

      {emi && (
        <>
          <Typography variant="h6">
            Monthly EMI Amount:{" "}
            {new Intl.NumberFormat("en-IN", {
              maximumSignificantDigits: 3,
            }).format(emi.monthly)}
          </Typography>
          <Typography variant="h6">
            Last EMI Amount:{" "}
            {new Intl.NumberFormat("en-IN", {
              maximumSignificantDigits: 3,
            }).format(emi.last)}{" "}
          </Typography>
        </>
      )}
    </Container>
  );
};

export default EMIForm;
