/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // images: { loader: 'custom' },
  swcMinify: true,

  // experimental: {
  //   newNextLinkBehavior: true,

  //   images: {
  //     unoptimized: true,
  //     allowFutureImage: true,

  //   },
  // },

  // rules: {
  //   'no-restricted-imports': [
  //     'error',
  //     // Disabling using of useLayoutEffect from react
  //     {
  //       name: 'react',
  //       importNames: ['useLayoutEffect'],
  //       message:
  //         '`useLayoutEffect` causes a warning in SSR. Use `useIsomorphicLayoutEffect`',
  //     },
  //   ],
  //   'no-restricted-syntax': [
  //     'error',
  //     // Ensure import from '*use-isomorphic-layout-effect' is `useLayoutEffect` to leverage `eslint-plugin-react-hooks`
  //     {
  //       selector:
  //         'ImportDeclaration[source.value=/use-isomorphic-layout-effect/] > ImportDefaultSpecifier[local.name!="useLayoutEffect"]',
  //       message:
  //         'Must use `useLayoutEffect` as the name of the import from `*use-isomorphic-layout-effect` to leverage `eslint-plugin-react-hooks`',
  //     },
  //   ],
  // }
}

module.exports = nextConfig
