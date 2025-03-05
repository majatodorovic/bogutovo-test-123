const PlusMinusInputOne = ({ quantity, maxAmount, updateCart, id }) => {
  return (
    <div className=" flex max-w-[6.25rem] items-center rounded-md bg-[#f7f7f7] ">
      <div className="flex items-center w-full">
        <span
          className="text-center cursor-pointer flex-1 text-lg select-none block pl-[7px] pr-[7px] py-[0px]"
          onClick={() => {
            if (quantity == 1) return;

            updateCart({
              id: id,
              quantity: quantity - 1,
              type: true,
            });
          }}
        >
          -
        </span>
        <input
          maxLength="2"
          max={maxAmount}
          type="string"
          value={quantity}
          onChange={(e) => {
            const value = e.target.value;
            const isNumber = /^\d+$/.test(value);

            if (!isNumber) return;

            updateCart({
              id: id,
              quantity: e.target.value,
              type: true,
            });
          }}
          className="bg-[#f7f7f7] w-[32px] text-center no-spinners mx-auto flex-1 focus:border-none focus:outline-none p-0 focus:ring-0 select-none text-sm border-none text-sm"
        />
        <span
          className="text-center cursor-pointer flex-1 text-lg select-none block pl-[7px] pr-[7px] py-[0px]"
          onClick={() => {
            updateCart({
              id: id,
              quantity: quantity + 1,
              type: true,
            });
          }}
        >
          +
        </span>
      </div>
    </div>
  );
};

export default PlusMinusInputOne;
