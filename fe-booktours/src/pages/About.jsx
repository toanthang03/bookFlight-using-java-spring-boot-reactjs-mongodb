import React, { useEffect } from "react";

const people = [
  {
    name: "Lê Nguyễn Công Hoan",
    role: "Trưởng nhóm",
    imageUrl:
      "https://scontent.fsgn2-11.fna.fbcdn.net/v/t39.30808-6/378134594_1012072103323885_707933784094652145_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeEcyCaEqMjh2D8ce-7dhtYbhQEKMkzztF-FAQoyTPO0XxtjRJ7dhbksSiIOnNFTOh_rYai41dmEnaKBHPhYJL24&_nc_ohc=2BLD2C7R7ekQ7kNvgGeozOO&_nc_zt=23&_nc_ht=scontent.fsgn2-11.fna&_nc_gid=ATIAcicAwB5z_o4mW_7ZhGF&oh=00_AYBI5LLXdUe7Zg2_oBzjYg9xi8fLcLEFPiFZkedaKejPew&oe=67433995",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Hoàng Văn Chiến",
    role: "Thành viên",
    imageUrl:
      "https://scontent.fsgn2-11.fna.fbcdn.net/v/t39.30808-6/378134594_1012072103323885_707933784094652145_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeEcyCaEqMjh2D8ce-7dhtYbhQEKMkzztF-FAQoyTPO0XxtjRJ7dhbksSiIOnNFTOh_rYai41dmEnaKBHPhYJL24&_nc_ohc=2BLD2C7R7ekQ7kNvgGeozOO&_nc_zt=23&_nc_ht=scontent.fsgn2-11.fna&_nc_gid=ATIAcicAwB5z_o4mW_7ZhGF&oh=00_AYBI5LLXdUe7Zg2_oBzjYg9xi8fLcLEFPiFZkedaKejPew&oe=67433995",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  {
    name: "Lã Toàn Thắng",
    role: "Thành viên",
    imageUrl:
      "https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/426474221_1111119666566780_6730225698579296697_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGxyO-4PR-2EK2E_mTF2Ab4gf6-j44doWyB_r6Pjh2hbDkd2TRqX2U_w8w2jjAARYbYzsBStk5O_ej2_jcLWuaC&_nc_ohc=JVcd4GoCqBgQ7kNvgG0d8VW&_nc_zt=23&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=ACkJqqgmD83IEaQulAbnyuE&oh=00_AYBz27NkNcRWmc0YC7Kiqklg_YYcmZBRO5fBauO4L6ZxCw&oe=67433370",
    twitterUrl: "#",
    linkedinUrl: "#",
  },
  // More people...
];

const whyChooseUs = [
  {
    title: "Đa dạng tour du lịch",
    content:
      "GoTrip cung cấp hàng ngàn lựa chọn tour du lịch từ các địa điểm nổi tiếng trong nước đến những điểm đến hấp dẫn trên toàn thế giới. Dù bạn yêu thích du lịch biển, núi, hay các thành phố sôi động, chúng tôi đều có giải pháp phù hợp.",
  },
  {
    title: "Đặt tour dễ dàng",
    content:
      "Với nền tảng trực tuyến thân thiện, việc tìm kiếm và đặt tour chưa bao giờ dễ dàng đến thế. Bạn chỉ cần vài thao tác đơn giản để lựa chọn tour, kiểm tra lịch trình và thanh toán nhanh chóng.",
  },
  {
    title: "Giá cả cạnh tranh",
    content:
      "Chúng tôi hợp tác với các đối tác uy tín để cung cấp các tour chất lượng cao với mức giá hợp lý. GoTrip cam kết mang đến cho bạn những tour du lịch với giá tốt nhất, phù hợp với mọi ngân sách.",
  },
  {
    title: "Dịch vụ khách hàng tận tâm",
    content:
      "Đội ngũ chăm sóc khách hàng của GoTrip luôn sẵn sàng hỗ trợ bạn 24/7, giải đáp mọi thắc mắc và giúp bạn hoàn thành chuyến đi hoàn hảo.",
  },
  {
    title: "An toàn và đáng tin cậy",
    content:
      "An toàn của khách hàng là ưu tiên hàng đầu của GoTrip. Chúng tôi luôn đảm bảo rằng mọi dịch vụ đều tuân thủ các tiêu chuẩn an toàn và chất lượng cao nhất, mang đến cho bạn sự yên tâm khi đặt tour.",
  },
];
const About = () => {
  useEffect(() => {
    document.title = "GoTrip - Giới thiệu";
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="relative py-16 bg-white overflow-hidden">
        <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
          <div
            className="relative h-full text-lg max-w-prose mx-auto"
            aria-hidden="true"
          >
            <svg
              className="absolute top-12 left-full transform translate-x-32"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
              />
            </svg>
            <svg
              className="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
              />
            </svg>
            <svg
              className="absolute bottom-12 left-full transform translate-x-32"
              width={404}
              height={384}
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="d3eb07ae-5182-43e6-857d-35c643af9034"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
              />
            </svg>
          </div>
        </div>
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto">
            <h1>
              <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
                Giới thiệu
              </span>
              <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Chào mừng đến với GoTrip - Dịch vụ bán tour du lịch số 1 Việt
                Nam!
              </span>
            </h1>
            <p className="mt-8 text-xl text-gray-500 leading-8">
              Tại GoTrip, chúng tôi cam kết mang đến cho bạn những trải nghiệm
              du lịch tuyệt vời, tiện lợi và hoàn hảo nhất. Với nền tảng trực
              tuyến tiên tiến, GoTrip là lựa chọn hàng đầu cho những ai muốn
              khám phá những điểm đến nổi tiếng, đồng thời tận hưởng những dịch
              vụ chất lượng cao với giá cả hợp lý.
            </p>
          </div>
          <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
            <p>
              GoTrip không chỉ đơn giản là một nền tảng bán tour, mà là nơi kết
              nối những người yêu du lịch với các tour du lịch đa dạng, phong
              phú, từ những chuyến du lịch gần gũi trong nước cho đến những hành
              trình khám phá quốc tế. Chúng tôi hiểu rằng mỗi chuyến đi đều là
              một kỷ niệm đáng nhớ, và vì thế, mỗi tour du lịch của GoTrip đều
              được chúng tôi thiết kế kỹ lưỡng để mang lại cho bạn sự thoải mái
              và niềm vui tuyệt đối.
            </p>
            <h2>Vì sao chọn chúng tôi</h2>
            <ul role="list">
              {whyChooseUs.map((item) => (
                <li key={item.title}>
                  <p>
                    <span className="font-bold">{item.title}:</span>{" "}
                    {item.content}
                  </p>
                </li>
              ))}
            </ul>
            <h2>Hãy để GoTrip đưa bạn đến những miền đất mới</h2>
            <p>
              Dù bạn là người yêu thích sự khám phá, tìm kiếm kỳ nghỉ thư giãn
              hay muốn có những trải nghiệm mới mẻ, GoTrip luôn sẵn sàng đồng
              hành cùng bạn trong mỗi chuyến đi. Chúng tôi không chỉ là một dịch
              vụ bán tour, mà là một người bạn đồng hành, giúp bạn biến mỗi
              chuyến đi thành một câu chuyện đẹp.
            </p>
            <figure>
              <img
                className="w-full rounded-lg"
                src="https://media.travel.com.vn/Tour/tfd_240925033409_190608_TA%20KU%20(3).jpg"
                alt=""
                width={1310}
                height={873}
              />
              <figcaption>
                Hãy bắt đầu hành trình của bạn ngay hôm nay với GoTrip - Dịch vụ
                bán tour du lịch số 1 Việt Nam!
              </figcaption>
            </figure>
            <h2>Chúng Tôi Là Ai?</h2>
            <p>
              GoTrip được sáng lập với sứ mệnh mang đến cho du khách những trải
              nghiệm du lịch dễ dàng, an toàn và tuyệt vời nhất. Với đội ngũ
              chuyên gia giàu kinh nghiệm trong ngành du lịch và công nghệ,
              chúng tôi luôn nỗ lực để cải thiện và phát triển dịch vụ, giúp bạn
              không chỉ đặt tour mà còn có những chuyến đi thật sự ý nghĩa.
              Chúng tôi tin rằng, mỗi chuyến đi đều là cơ hội để bạn khám phá
              thế giới, mở rộng tầm nhìn và tạo nên những kỷ niệm tuyệt vời.
            </p>
            <h2>Hãy Cùng GoTrip Khám Phá Thế Giới!</h2>
            <p>
              Dù bạn là người yêu thích khám phá văn hóa, tìm kiếm sự thư giãn
              hay đơn giản là muốn trải nghiệm những điều mới mẻ, GoTrip luôn có
              những lựa chọn tour hoàn hảo cho bạn. Với GoTrip, mỗi chuyến đi
              đều là một cơ hội để bạn tạo nên những kỷ niệm đáng nhớ.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
          <div className="space-y-12">
            <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Thành viên trong nhóm
              </h2>
              <p className="text-xl text-gray-500">
                Các thành viên trong nhóm đã cùng nhau xây dựng dự án GoTrip
              </p>
            </div>
            <ul
              role="list"
              className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8"
            >
              {people.map((person) => (
                <li key={person.name}>
                  <div className="space-y-4">
                    <div className="aspect-w-3 aspect-h-2">
                      <img
                        className="object-cover shadow-lg rounded-lg"
                        src={person.imageUrl}
                        alt=""
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="text-lg leading-6 font-medium space-y-1">
                        <h3>{person.name}</h3>
                        <p className="text-indigo-600">{person.role}</p>
                      </div>
                      <ul role="list" className="flex space-x-5">
                        <li>
                          <a
                            href={person.twitterUrl}
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Twitter</span>
                            <svg
                              className="w-5 h-5"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                          </a>
                        </li>
                        <li>
                          <a
                            href={person.linkedinUrl}
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">LinkedIn</span>
                            <svg
                              className="w-5 h-5"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
