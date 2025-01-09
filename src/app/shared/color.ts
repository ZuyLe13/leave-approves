export const typeLeaveColors: { [key: string]: string } = {
  WFH: 'bg-[#aba1ff]',
  'Internship WFH': 'bg-[#aba1ff]',
  'Annual Leave': 'bg-[#ff6771]',
  Wedding: 'bg-[#ff6771]',
  'Internship Leave': 'bg-[#bec94d]',
};

export const statusColors: { [key: string]: { icon: string; color: string } } =
  {
    'Waiting for approval': { icon: 'timelapse', color: 'text-blue-600' },
    Approved: { icon: 'check_circle_outline', color: 'text-green-600' },
    'Approve Cancelled': {
      icon: 'check_circle_outline',
      color: 'text-green-600',
    },
    Rejected: { icon: 'highlight_off', color: 'text-red-600' },
    Cancelled: { icon: 'highlight_off', color: 'text-red-600' },
  };
