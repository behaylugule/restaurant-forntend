import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { orderService } from "@/lib/services/orderService";
import { timeFormat } from "@/lib/utils";
import { OrderType } from "@/type/order.model";
import { OrderItemType } from "@/type/orderitem.model";
import { ORDER_STATUS } from "@/utils/utils";
import { LucideTable2 } from "lucide-react";
interface PropsType {
  order: OrderType | undefined;
  handleStatusChange: (status: string, order?: OrderType) => void;
}
export default function DisplayCard({ order, handleStatusChange }: PropsType) {
  return (
    <Card className="pt-0">
      <CardHeader
        className={`w-full py-2 rounded-t-lg ${
          order?.status === ORDER_STATUS.PENDING
            ? "bg-[#C71F37]"
            : order?.status == ORDER_STATUS.PROCESSING
            ? "bg-yellow-400"
            : "bg-green-400"
        } flex justify-between items-center text-white px-2`}
      >
        <div className="flex flex-col gap-2">
          <span>Customer :{order?.username}</span>
          <span className="flex gap-3">
            <LucideTable2 /> {order?.table_number_name}
          </span>
          <span>Order ID : {order?.id}</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="px-4 py-2 border-2 border-gray-300 rounded-[30px] items-center justify-center">
            Dine In
          </span>
          <span>{timeFormat(order?.create_date || new Date())}</span>
        </div>
      </CardHeader>
      <CardContent className="px-3 py-2 flex flex-col gap-3">
        {order?.order_items?.map((item) => {
          return (
            <div
              className="flex gap-4 items-center text-gray-600 text-normal"
              key={item.id}
            >
              <span>{item.quantity}x</span>
              <span>{item.menu_name}</span>
            </div>
          );
        })}
      </CardContent>
      <CardFooter className="w-full flex items-center gap-3">
        {order?.status != ORDER_STATUS.READY && (
          <Button
            className="flex-1"
            onClick={() => handleStatusChange(ORDER_STATUS.CANCLED, order)}
          >
            Cancle
          </Button>
        )}
        <Button
          className="flex-1 bg-gray-200 text-gray-600 hover:bg-gray-300"
          onClick={() => {
            if (order?.status === ORDER_STATUS.PENDING) {
              handleStatusChange(ORDER_STATUS.PROCESSING, order);
            } else if (order?.status === ORDER_STATUS.PROCESSING) {
              handleStatusChange(ORDER_STATUS.READY, order);
            } else if (order?.status === ORDER_STATUS.READY) {
              handleStatusChange(ORDER_STATUS.COMPLETED, order);
            }
          }}
        >
          {order?.status === ORDER_STATUS.PENDING
            ? "Start"
            : order?.status == ORDER_STATUS.PROCESSING
            ? "Finish"
            : "Completed"}
        </Button>
      </CardFooter>
    </Card>
  );
}
