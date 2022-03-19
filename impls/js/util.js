exports.apply = (fn, args) => {
  let val;

  if (fn.length === 1) {
    return fn.apply(null, args);
  } else {
    val = fn(args[0], args[1]);

    for (let i = 2; i < args.length; i++) {
      val = fn(val, args[i]);
    }

    return val;
  }
};
