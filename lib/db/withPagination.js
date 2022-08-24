export async function withPagination(callback, args, pageSize) {
  const argsWithTake = Object.assign({ take: pageSize + 1 }, args);

  const data = await callback(argsWithTake);
  const gotEnoughData = data.length >= pageSize + 1;

  const newCursor = gotEnoughData ? data.at(-2).id : undefined;
  const pageData = gotEnoughData ? data.slice(0, -1) : data;

  return { pageData, pageCursor: newCursor };
}
