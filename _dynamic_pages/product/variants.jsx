"use client";
import { convertHttpToHttps } from "@/_helpers";
import Image from "next/image";
import { useState, useEffect, Suspense } from "react";

export const Variants = ({
  product,
  updateProductVariant,
  updateProductPrice,
  productSlug,
  handleURLChange,
  setSelectedColor = () => {},
  setVariant,
  setVariantOnOff,
  setSelectedOptions,
}) => {
  let variant_options = product?.data?.variant_options; // niz svih variant_options
  let variant_items = product?.data?.variant_items; // niz svih varijanti proizvoda
  let product_slug = productSlug; // slug proizvoda koji se prikazuje
  let variant_product = null; // krajnji proizvod koji se prikazuje
  const [selected, setSelected] = useState([]); // niz selektovanih variant_options
  const [productCategory,setProductCategory] = useState('');
  const str = product.data.item.categories[0].category_path_name;
  const beforeGreaterThan = str.split(">")[0].trim();
  useEffect(() => {
    if (setVariant) {
      setSelected([
        {
          attribute_key: variant_options[1]?.attribute?.key,
          value_key: variant_options[1]?.values[0]?.key,
        },
      ]);
      setVariantOnOff(false);
    }
  }, [setVariant]);

  useEffect(() => {
    setSelectedOptions(selected);
  }, [selected]);

  const [variantOptions, setVariantOptions] = useState(variant_options); // niz variant_options koji se prikazuje

  useEffect(() => {
    // uzima item iz variant_items na osnovu slug-a
    let selected_item = getSelectedItem(product_slug);

    // if (!selected_item) {
    //   selected_item = handleVariantFirstOption();
    // }

    // ako postoji item iz variant_items na osnovu slug-a i setuje se selected
    if (selected_item) {
      (selected_item?.variant_key_array || []).forEach((item) => {
        onChangeHandler(item?.attribute_key, item?.value_key);
      });

      setSelectedColor(selected_item.variant_key_array[1]?.value_key);
    }

    if (selected_item) {
      variant_product = selected_item;
      updateProductVariant(variant_product);
    }

    handleVariantOptionChange();
  }, [selected]);

  useEffect(() => {
    if (variant_items.length > 0) {
      const product = variant_items.find((item) => item.slug === productSlug);
      if (product) {
        updateProductVariant(product);
      }
    }
  }, [productSlug, variant_items]);

  //menja URL na osnovu selektovanih variant_options
  useEffect(() => {
    handleURLChange(product_slug);
  }, [product_slug]);

  // ako nema slug-a u URL-u, uzima prvi item iz variant_items i setuje ga kao selected
  useEffect(() => {
    const getProduct = () => {
      if (!product_slug) {
        variant_product = getSelectedItem(product_slug);
      }
    };
    getProduct();
  }, [product_slug]);

  // uzima item iz variant_items na osnovu slug-a
  const getSelectedItem = (slug) => {
    let t_item = null;
    variant_items?.map((item) => {
      if (item.slug === slug) {
        t_item = item;
      }
    });
    return t_item;
  };

  // funkcija koja variant_options setuje vrednost selected_value, selected i display
  const setVariantOptionsVisible = (data) => {
    let options = [];
    data?.map((item) => {
      let t_item = {
        attribute: item.attribute,
        values: [],
      };

      t_item.attribute["selected_value"] = false;

      item.values.map((value) => {
        let t_val = value;
        t_val["display"] = "show";
        t_val["selected"] = false;

        t_item.values.push(t_val);
      });

      options.push(t_item);
    });

    return options;
  };

  // funkcija koja trazi variant_items koji odgovaraju selektovanim variant_options
  const getSelectedVariants = (selected, variant_items) => {
    let options = [];
    variant_items.map((item) => {
      let t_count = 0;
      if (selected.length) {
        selected.map((temp_condition) => {
          item.variant_key_array.map((temp_variant_key_array) => {
            if (
              temp_condition.attribute_key ===
                temp_variant_key_array.attribute_key &&
              temp_condition.value_key === temp_variant_key_array.value_key
            ) {
              t_count += 1;
            }
          });
        });
      }

      if (t_count === selected.length) {
        options.push(item);
      }
    });
    return options;
  };

  // funkcija koja vraca proizvod na osnovu selektovanih variant_options
  const getProductVariant = () => {
    let options = getSelectedVariants(selected, variant_items);
    let product = [];

    if (options.length === 1) {
      product = options[0];
    }

    return product;
  };

  // funkcija koja oznacuje variant_options koja je selektovana
  const selectVariantOptions = (variant_options, attribute_key, value_key) => {
    variant_options.map((item) => {
      if (item.attribute.key === attribute_key) {
        item.values.map((value) => {
          if (value.key === value_key) {
            value.selected = true;
            item.attribute.selected_value = true;
          }
        });
      }
    });
    return variant_options;
  };

  // funkcija koja vraca niz variant_options koji nisu selektovani
  const getNotSelectedVariantOptions = (variant_options) => {
    let options = [];
    variant_options.map((item) => {
      if (!item.attribute.selected_value) {
        options.push(item.attribute.key);
      }
    });
    return options;
  };

  // funkcija koja izbacuje duplikate iz niza
  const removeDuplicates = (arr) => {
    return arr.filter((item, index) => arr.indexOf(item) === index);
  };

  // funkcija koja vraca niz vrednosti za prikaz na osnovu selektovanih variant_options
  const setValuesFromVariantOptions = (
    selected_variants,
    temp_not_selected,
  ) => {
    let options = [];
    selected_variants.map((item) => {
      item.variant_key_array.map((variant_key_array) => {
        if (variant_key_array.attribute_key === temp_not_selected) {
          options.push(variant_key_array.value_key);
        }
      });
    });

    return removeDuplicates(options);
  };

  // funkcija koja postavlja vrednosti za prikaz na osnovu selektovanih variant_options
  const setValuesForShowToVariantOptions = (
    variant_options,
    temp_not_selected,
    values_to_show,
  ) => {
    variant_options.map((item) => {
      if (item.attribute.key === temp_not_selected) {
        item.values.map((value) => {
          if (values_to_show.indexOf(value.key) === -1) {
            value.display = "hide";
          } else {
            value.display = "show";
          }
        });
      }
    });

    return variant_options;
  };

  // funkcija koja menja stanje variant_options
  const handleVariantOptionChange = () => {
    variant_options = setVariantOptionsVisible(variant_options);
    if (selected.length) {
      let check_selected = [];

      selected.map((temp_select) => {
        variant_options = selectVariantOptions(
          variant_options,
          temp_select.attribute_key,
          temp_select.value_key,
        );

        check_selected.push(temp_select);
        let selected_variants = getSelectedVariants(
          check_selected,
          variant_items,
        );

        let not_selected = getNotSelectedVariantOptions(variant_options);

        if (not_selected.length) {
          not_selected.map((temp_not_selected) => {
            let values_to_show = setValuesFromVariantOptions(
              selected_variants,
              temp_not_selected,
            );
            variant_options = setValuesForShowToVariantOptions(
              variant_options,
              temp_not_selected,
              values_to_show,
            );
          });
        }
      });
    }

    setVariantOptions(variant_options);
  };

  // onChangeHandler funkcija za selektovanje variant_options nakon odabira vrednosti
  const onChangeHandler = (attribute_key, value_key) => {
    let temp_selected = selected;

    let temp_selected_item = {
      attribute_key: attribute_key,
      value_key: value_key,
    };

    let temp_index = temp_selected.findIndex(
      (x) => x.attribute_key === temp_selected_item.attribute_key,
    );

    if (temp_index > -1) {
      temp_selected[temp_index] = temp_selected_item;
      temp_selected.map((temp_selected_item, index) => {
        if (index > temp_index) {
          temp_selected.splice(index, temp_selected.length - index);
        }
      });
    } else {
      temp_selected.push(temp_selected_item);
    }

    setSelected(temp_selected);
  };

  useEffect(() => {
    if (variant_options?.length === 1) {
      updateProductVariant(variant_items[0]);
      setSelected(variant_items[0]?.variant_key_array);
      onChangeHandler(
        variant_items[0]?.variant_key_array[0]?.attribute_key,
        variant_items[0]?.variant_key_array[0]?.value_key,
      );
    }
  }, [variant_options]);

  const [sizeModal, setSizeModal] = useState(false);

  useEffect(() => {
    variant_options?.forEach((item) => {
      if (item?.values?.length === 1) {
        setSelected([
          {
            attribute_key: item?.attribute?.key,
            value_key: item?.values?.[0]?.key,
          },
        ]);
        handleVariantOptionChange();
      }
    });
  }, []);

  useEffect(() => {
    // Add overflow-hidden class to the body when sizeModal is true
    if (sizeModal) {
      document.body.style.overflow = 'hidden'; // This disables scrolling
    } else {
      document.body.style.overflow = 'auto'; // This restores scrolling
    }

    // Clean up on component unmount
    return () => {
      document.body.style.overflow = 'auto'; // Ensure scroll is enabled on unmount
    };
  }, [sizeModal]); 

  console.log("variantOptions",variantOptions)

  return (
    <>
      <div className="flex flex-col divide-y max-md:gap-2 max-lg:w-full">
        {(variantOptions || [])?.map((item) => {
          return (
            <div
              key={`item-${item?.attribute?.name}`}
              className={`flex py-4 ${
                item?.attribute?.name === "Boja"
                  ? "flex-row odd:border-t justify-between items-center"
                  : "flex-col gap-[0.7rem]"
              }`}
            >
              <div className={`flex items-center justify-between`}>
                <label
                  htmlFor={item.id}
                  className={`max-lg:text-left text-[0.938rem] font-bold max-md:font-normal min-w-[5.619rem]`}
                >
                  {item.attribute.name}
                </label>
                {item?.attribute?.name === "Veličina" && (
                  <div
                    className={`flex gap-2 group cursor-pointer`}
                    onClick={() => {
                      setSizeModal(true);
                      console.log('bgt',beforeGreaterThan);
                      switch(beforeGreaterThan) {
                        case 'Devojčice':
                          setProductCategory('devojcice')
                          break;
                        case 'Muškarci':
                          setProductCategory('muskarci')
                          break;
                        case 'Žene':
                            setProductCategory('zene')
                            break;
                        case 'Dečaci':
                          setProductCategory('decaci')
                          break;
                        default:
                          break
                      }
                    }}
                  >
                    <Image
                      src={`/icons/measure.png`}
                      alt={`Bogutovo`}
                      width={20}
                      height={20}
                    />
                    <span className="text-[13px] group-hover:underline">
                      Tabela veličina
                    </span>
                  </div>
                )}
              </div>
              <form
                key={item.id}
                id={item.id}
                name={item.attribute.key}
                className="max-md:px-0 flex flex-row gap-[1.25rem] flex-wrap md:max-w-[80%]"
                // onChange={(e) => {
                //   onChangeHandler(item.attribute.key, e.target.value);
                //   handleVariantOptionChange();
                //   variant_product = getProductVariant();
                //   if (variant_product) {
                //     updateProductVariant(variant_product);
                //     updateProductPrice(variant_product?.price?.price?.original);
                //     handleURLChange(variant_product?.slug);
                //     product_slug = variant_product?.slug;
                //   } else {
                //     updateProductVariant(null);
                //     updateProductPrice(null);
                //   }
                // }}
              >
                {item?.attribute?.name === "Boja"
                  ? item.values.map((value) => {
                      let display = value.display;
                      return (
                        <div
                          key={`val-${value?.key}-${item.attribute.key}`}
                          className={display === "show" ? `block` : `hidden`}
                        >
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              onChangeHandler(item.attribute.key, value.key);
                              handleVariantOptionChange();
                              variant_product = getProductVariant();
                              if (variant_product) {
                                updateProductVariant(variant_product);

                                handleURLChange(variant_product?.slug);
                                product_slug = variant_product?.slug;
                              }
                              setSelectedColor(value.key);
                            }}
                            key={value.id}
                            value={value.key}
                            selected={value.selected}
                            style={{ display: value.display }}
                            className={
                              display === "show"
                                ? `block text-[0.875rem]`
                                : `hidden`
                            }
                            aria-label={value.name}
                          >
                            {(value?.product_image || value?.image) && (
                              <div
                                className={`${
                                  selected.find(
                                    (x) =>
                                      x.attribute_key === item.attribute.key &&
                                      x.value_key === value.key,
                                  )
                                    ? `border border-black`
                                    : `border hover:border-black`
                                } h-[20px] w-[20px] rounded-full overflow-hidden`}
                              >
                                {value?.image && (
                                  <Suspense fallback={<div>Loading...</div>}>
                                    <Image
                                      src={convertHttpToHttps(value?.image)}
                                      width={65}
                                      height={85}
                                      alt={``}
                                      priority={true}
                                      className="h-full object-cover rounded-full scale-[500%]"
                                    />
                                  </Suspense>
                                )}
                              </div>
                            )}{" "}
                          </button>
                        </div>
                      );
                    })
                  : item.values.map((value, i) => {
                      let display = value.display;
                      return (
                        <button
                          key={`val-${i}`}
                          value={value.key}
                          selected={value.selected}
                          style={{ display: value.display }}
                          className={
                            display === "show"
                              ? `block text-[0.834rem] ${
                                  selected.find(
                                    (x) =>
                                      x.attribute_key === item.attribute.key &&
                                      x.value_key === value.key,
                                  )
                                    ? `bg-black border border-black hover:border-black text-white
                           `
                                    : `border hover:bg-black hover:text-white border-black`
                                } px-5 py-2`
                              : `hidden`
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            onChangeHandler(item.attribute.key, e.target.value);
                            handleVariantOptionChange();
                            variant_product = getProductVariant();
                            if (variant_product) {
                              updateProductVariant(variant_product);

                              handleURLChange(variant_product?.slug);
                              product_slug = variant_product?.slug;
                            } else {
                              updateProductVariant(null);
                              updateProductPrice(null);
                            }
                          }}
                        >
                          {value.name}
                        </button>
                      );
                    })}
              </form>
            </div>
          );
        })}
      </div>
      {sizeModal && (
        <div
          onClick={(e) => {
            if (e.currentTarget === e.target) {
              setSizeModal(false);
            }
          }}
          className={`fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center`}
        >
          <div
            className={`bg-white h-[40rem] md:h-[50rem] w-[50rem] mx-auto p-5 sm:p-10 overflow-y-auto`}
          >
            <div className={`border-b border-slate-300 pb-5`}>
              <div className={`flex justify-between items-center `}>
                <h3 className={`text-[1.5rem] font-bold`}>Tabele veličina</h3>
                <button onClick={() => setSizeModal(false)}>X</button>
              </div>
            </div>
            <div className={`mt-5 flex flex-col justify-center text-center items-center`}>
              <h3
              >
              {beforeGreaterThan.toLocaleUpperCase()}
              </h3>
              <Image src={`/media/${productCategory}.png`} height={750} width={600} alt="Tabela mera za Žene" />
              {/* <h3
              >
                Muškarci
              </h3>
              <Image src={'/media/muskarci.png'} height={750} width={600} alt="Tabela mera za Muškarce" />
              <h3
              >
                Devojčice
              </h3>
              <Image src={'/media/devojcice.png'} height={750} width={600} alt="Tabela mera za Devojčice" />
              <h3
              >
                Dečaci
              </h3>
              <Image src={'/media/decaci.png'} height={750} width={600} alt="Tabela mera za Dečake" /> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
