export const styleApplicationStatus = (applicationStatus: string): string => {
  if (applicationStatus === 'PENDING') return 'text-yellow-600';
  else if (applicationStatus === 'ACCEPTED') return 'text-green-600';
  else return 'text-red-600';
};
