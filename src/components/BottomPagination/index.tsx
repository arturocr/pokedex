import { Button, Stack } from "@mui/material";

type BottomPaginationProps = {
  pagination: {
    limit: number;
    offset: number;
  };
  setPagination: (pagination: { limit: number; offset: number }) => void;
};

const BottomPagination = ({
  pagination,
  setPagination,
}: BottomPaginationProps) => {
  return (
    <Stack
      bgcolor={"#919191CC"}
      boxShadow={5}
      direction="row"
      gap={2}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
      p={2}
    >
      <Button
        variant="contained"
        color="secondary"
        disabled={pagination.offset === 0}
        size="large"
        onClick={() => {
          setPagination({
            ...pagination,
            offset: pagination.offset - pagination.limit,
          });
        }}
      >
        Prev
      </Button>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={() => {
          setPagination({
            ...pagination,
            offset: pagination.offset + pagination.limit,
          });
        }}
      >
        Next
      </Button>
    </Stack>
  );
};

export default BottomPagination;
