const ResolvedContent = ({ linkedItem, type, resolveFunc }) => {
  return resolveFunc({
    linkedItem: linkedItem,
    type: type
  });
};

export default ResolvedContent;