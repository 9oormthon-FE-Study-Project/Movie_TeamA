// components/review/Plot.tsx
import { useState, useMemo, useRef } from 'react';

export default function Plot() {
  const content =
    '보송보송한 파란 솜털, 호기심 가득한 큰 눈, 장난기 가득한 웃음을 가졌지만..! 가장 위험한 실험체 취급을 받던 ‘스티치’는 우주에서 도망쳐 지구의 하와이 섬에 불시착하게 된다. 단짝 친구를 원하던 외톨이 소녀 ‘릴로’는 별똥별과 함께 나타난 귀여운 파란색 강아지(?) ‘스티치’와 소중한 친구이자, 하나의 가족이 되어가며 외로웠던 일상이 유쾌하게 변하기 시작한다. 그러던 어느 날, ‘스티치’를 잡아 우주로 되돌아가려는 정체불명의 요원들이 등장하고 ‘릴로’와 ‘스티치’는 예상치 못한 상황을 마주하게 되는데…! 완벽하진 않지만 가장 사랑스러운 가족 외톨이 소녀 ‘릴로’와 금쪽이 ‘스티치’의 버라이어티한 모험을 확인하라!';

  const [isShowMore, setIsShowMore] = useState(false);
  const textLimit = useRef(100);

  const displayedText = useMemo(() => {
    if (content.length <= textLimit.current) return content;
    return isShowMore ? content : content.slice(0, textLimit.current) + '...';
  }, [isShowMore]);

  return (
    <div className='mx-4'>
      <p className='mb-2'>{displayedText}</p>
      {content.length > textLimit.current && (
        <button
          onClick={() => setIsShowMore(!isShowMore)}
          className='text-blue-400 hover:underline'
        >
          {isShowMore ? '줄이기' : '더보기'}
        </button>
      )}
    </div>
  );
}
