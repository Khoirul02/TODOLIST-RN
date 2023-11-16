/* eslint-disable prettier/prettier */
export const stylesheets = {
  container: color => ({
    backgroundColor: color,
    flex: 1,
  }),
  row : {flexDirection: 'row'},
  pages: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 18,
    paddingBottom: 0,
    marginTop: 50,
  },
  contentCenter: color => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color,
  }),
  contentCenterNoBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleBold: (color, size) => ({
    color: color,
    fontSize: size === undefined ? 16 : size,
    fontWeight: 'bold',
  }),
  title: (color, size) => ({
    color: color,
    fontSize: size === undefined ? 14 : size,
    fontWeight: '600',
  }),
  titleCenter: (color, size) => ({
    color: color,
    fontSize: size === undefined ? 14 : size,
    fontWeight: '600',
    textAlign: 'center',
  }),
  contentFloatingBottom: {
    position: 'absolute',
    bottom: 30,
    left: 15,
    right: 15,
    alignItems: 'flex-end',
  },
  containerFlex: {flex: 1},
};
