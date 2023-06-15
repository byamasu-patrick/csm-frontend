import { useState } from "react";
import Swal from "sweetalert2";
import { useAppDispatch } from "../../../../../libs/store";
import { addDiscountToDB } from "../../../../../libs/store/Discount";

interface ProductInfo {
  productName: string;
  productId: string;
  price: number;
}

const DiscountForm: React.FC<ProductInfo> = ({
  productId,
  price,
  productName,
}) => {
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  let amountCalculated = 0;
  const dispatch = useAppDispatch();

  let discountData: Array<number> = [];
  discountData.push(0);
  let initialValue = 0;

  for (var i = 1; i <= 20; i++) {
    initialValue = initialValue + 5;
    discountData.push(initialValue);
  }

  console.log(discountData);

  const DiscountElement = () => {
    return discountData.map((data, index) => {
      return (
        <option key={index} value={data} className="text-gray-900 py-4">
          {data} %
        </option>
      );
    });
  };
  const addDiscount = async () => {
    if (description && title && discountPercentage) {
      await dispatch(
        addDiscountToDB({
          description,
          headline: title,
          productId,
          productName,
          amount: (price * discountPercentage) / 100,
        })
      );

      setDescription("");
      setTitle("");
      setDiscountPercentage(0);
      //             "productName": "string",
      //   "productId": "string",
      //   "headline": "string",
      //   "description": "string",
      //   "amount": 0
      Swal.fire({
        icon: "success",
        text: "Successfuly saved the discount",
        showConfirmButton: false,
        timer: 1500,
        width: "400px",
        imageWidth: 10,
        imageHeight: 10,
      });
    } else {
      Swal.fire({
        icon: "error",
        text: "Fill all the input please",
        showConfirmButton: false,
        timer: 1500,
        width: "400px",
        imageWidth: 10,
        imageHeight: 10,
      });
    }
  };

  return (
    <>
      <div className="mt-4 w-full flex justify-between">
        <div className="space-y-1 w-full">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Promotion title <small>(it can any, based on your promotion)</small>
          </label>
          <div className="mt-1">
            <input
              id="title"
              name="title"
              type="text"
              value={title}
              placeholder="headline for the promition"
              autoComplete="name"
              required
              className={`appearance-none w-full block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm focus:ring-orange-500 focus:border-orange-500`}
              onChange={(event: React.FormEvent<HTMLInputElement>) => {
                setTitle(event?.currentTarget?.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="pt-4 w-full">
        <div className="space-y-1">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <div className="mt-1">
            <textarea
              rows={3}
              id="description"
              value={description}
              name="description"
              autoComplete="description"
              placeholder="Write what you want customers to know about this promotion."
              required
              className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm
                            focus:ring-orange-500 focus:border-orange-500
                            `}
              onChange={(event: any) => {
                setDescription(event?.currentTarget?.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="mt-4 w-full flex justify-between">
        <div className="space-y-1 w-full">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Discount Percentage{" "}
            <small>
              (Please select the amount of percentage of discount from the
              actual price, this will generate a coupon to be applied when
              customers want to buy this product)
            </small>
          </label>
          <div className="mt-1">
            <select
              id="category"
              name="category"
              value={discountPercentage}
              required
              className={`appearance-none bg-white w-full block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  sm:text-sm focus:ring-orange-500 focus:border-orange-500
                            `}
              onChange={(event: any) => {
                setDiscountPercentage(event.currentTarget.value);
              }}
            >
              {DiscountElement()}
            </select>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-end py-3">
        <button
          type="submit"
          onClick={() => addDiscount()}
          className="capitalize ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          Add Promotion
        </button>
      </div>
    </>
  );
};

export default DiscountForm;
