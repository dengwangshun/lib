async function login() {
  const response = await fetch(
    "https://seat.bjfu.edu.cn/rest/auth?username=200501301&password=0K%40SKHEZ%5D2)RV%5DL3"
  );
  console.log(await response.json());
}

await login();

export default login;
