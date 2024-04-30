import { useState } from "react";
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
        disabled={!startDate}
        inputProps={{
            min: startDate ? new Date(new Date(startDate).setMonth(new Date(startDate).getMonth() + 1)).toISOString().split('T')[0] : null,
          }}
      />
      <div>
        <Button variant="contained" size="small" color="primary" type="submit">
          Calculate EMI
        </Button>
      </div>
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
      <div>
      <Button
      size="small"
        variant="contained"
        color="primary"
        onClick={handleSubmit(handleTimeSlot)}
      >
        Add Time Slot
      </Button>

      </div>
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
