const MS_IN_A_DAY = 1000 * 60 * 60 * 24;

export const getFirstDayOfWeek = (offset: number) => {
    const today = new Date(Date.now() + MS_IN_A_DAY * 7 * offset);
    const todayNumber = today.getDay();
    // days are zero-indexed on sunday by delfault but we're Europeans here
    const deltaFromMonday = todayNumber === 0 ? 6 : todayNumber - 1;
    if (deltaFromMonday === 0) {
        return today
    }
    else {
        return new Date(today.valueOf() - (MS_IN_A_DAY * deltaFromMonday))
    }
}