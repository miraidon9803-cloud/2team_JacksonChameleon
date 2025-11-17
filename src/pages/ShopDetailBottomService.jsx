import React, { useState } from 'react'
import './scss/ShopDetailBottomService.scss'

const ShopDetailBottomService = () => {

    const [openIndex, setOpenIndex] = useState();

    const toggleIndex = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    };

    return (
        <div className='bottom-service-wrap'>
            <div className="inner">
                <div className="service-store-wrap">
                    <div className="service-store-top">
                        <p className="service-title">전시매장</p>
                        <div className="service-store">
                            <p className='sub-title'>가까운 오프라인 매장에서 더욱 자세히 만나보세요</p>
                            <p>이 제품은 아래 오프라인 매장에 전시되어 있습니다.<br />
                                *쇼룸별 DP 현황이 상이할 수 있으니, 방문 전 문의 부탁드립니다.</p>
                            <div className='store-info'>
                                <p><strong>잭슨카멜레온</strong>연희</p>
                                <p><strong>무브먼트랩</strong>한남,부산,의왕,원그로브</p>
                            </div>
                            <button>가까운 매장 바로가기</button>
                        </div>
                    </div>
                    <div className="service-store-bottom">
                        <p className="service-title">배송 및 CS</p>
                        <div className='service-cs'>
                            <p className='sub-title'>아래의 항목을 구매 전 반드시 읽어주세요.<br />
                                도착하는 순간까지 안전하게, 잭슨카멜레온은 항상 최선을 다합니다.</p>
                            <div className="dept-info-wrap">
                                <div className={`dept-info ${openIndex === 0 ? 'active' : ''}`}>
                                    <div className="dept-title" onClick={() => toggleIndex(0)}>
                                        취소/교환/반품
                                        <p className='plus'><img src="/images/plus-hover.png" alt="더보기" /></p>
                                        <p className='minus'><img src="/images/minus-hover.png" alt="숨기기" /></p>
                                    </div>
                                    <div className="dept-ex">
                                        <div class="policy">
                                            <p>
                                                잭슨카멜레온 가구는 제품의 컬러, 디자인, 원단, 주문제작 사항의 요건에 따라 제품이 달라지는 특이사항으로 결제 완료 시점으로부터
                                                &lt; 일반구매고객은 5일 / 클럽무브먼트 멤버십 구입 7일 &gt; 이후에 제작이 시작이 되며 제품 출고준비가 시작 됩니다.
                                            </p>

                                            <p>근거법률에 따라 청약의 철회가 제한되는 재화에 해당하므로 주문 취소 요청시 고객님께 위약금이 부과되거나 교환, 반품이 불가 할 수 있으니 다음과 같은 사항을 확인하시고 구매 부탁드립니다.</p>

                                            <p class="law">
                                                *근거법률 : 전자상거래 등에서 소비자보호에 관한 법률 제17조 제2항, 동법 제19조, 동법 시행령 21조
                                            </p>

                                            <h3>위약금 미발생</h3>
                                            <p>고객이 제품을 결제를 완료된 날로부터 &lt;일반 구매 5일&gt;이 경과되지 않았을 경우</p>

                                            <h3>위약금 발생 (상품구매가의 10%)</h3>
                                            <p>고객이 제품 결제를 완료한 날로부터 &lt;일반 구매 5일&gt;이 경과되어 제품 제작이 시작되고 제품이 출고 전 취소를 요청하는 경우</p>

                                            <h3>위약금 발생 (상품구매가의 20% + 왕복배송비)</h3>
                                            <ul>
                                                <li>제품 출고된 이후에 취소 요청 할 경우</li>
                                                <li>천연가죽, 기능성 원단, 원목가구 제작 과정에서 발생하는 자연스러운 현상 및 원자재의 고유 특성을 이유로 교환 및 반품 요청 시</li>
                                                <li>사이즈 허용오차(±3cm)에 따른 교환 및 반품 요청 시</li>
                                                <li>제품설치 후 3일 이내 교환 및 반품 요청 시</li>
                                                <li>구성품 일부(팔걸이, 의자 등)만 교환·반품 요청 시</li>
                                            </ul>

                                            <h3>교환·반품·취소 불가</h3>
                                            <ul>
                                                <li>제품설치 후 이상 유무 확인 후 3일 이후 요청 시</li>
                                                <li>소비자 귀책으로 제품 훼손된 경우</li>
                                                <li>주문제작 제품일 경우</li>
                                                <li>패키징 제품(화병, 악세사리) 개봉 시</li>
                                                <li>리퍼브·리유즈 제품일 경우</li>
                                            </ul>

                                            <h3>환불처리 기간</h3>
                                            <ul>
                                                <li>현금: 주문 취소 접수 후 3일 이내</li>
                                                <li>카드: 자사몰 취소 확정 후 카드사 처리까지 7–10일 소요</li>
                                            </ul>

                                            <h3>주문변경</h3>
                                            <p>
                                                잭슨카멜레온 주문제작가구는 결제 완료 시점(영업일 기준, 공휴일 제외)으로부터
                                                &lt;일반구매고객은 5일&gt; 이후 제작이 시작되며, 그 이후에는 원단·컬러 변경이 어렵습니다.
                                            </p>
                                            <p class="note">*해당 기간 내 변경 요청 시 출고 일정이 지연될 수 있습니다.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`dept-info ${openIndex === 1 ? 'active' : ''}`}>
                                    <div className="dept-title" onClick={() => toggleIndex(1)}>
                                        배송안내
                                        <p className='plus'><img src="/images/plus-hover.png" alt="더보기" /></p>
                                        <p className='minus'><img src="/images/minus-hover.png" alt="숨기기" /></p>
                                    </div>
                                    <div className="dept-ex">
                                        <div class="delivery-policy">

                                            <p>매주 월~토요일 배송이 진행됩니다. (일요일 배송 불가)</p>
                                            <p>주문 시 기재해 주신 연락처, 주소가 불분명할 경우 배송에 차질이 생길 수 있습니다. 유의해 주세요.</p>
                                            <p>제품이 들어갈 공간을 미리 마련해 주시기 바라며 기존 사용하던 가구 내림 서비스는 추가 비용이 발생할 수 있습니다.</p>
                                            <p>구매 후 배송 수령 기간은 최대 4개월까지입니다. 기간 안에 반드시 제품을 수령해 주시기 바랍니다.</p>

                                            <h3>배송 지역</h3>
                                            <p>전국 배송이 가능하나, 차량이동이 불가한 도서 산간 지역은 배송이 어렵습니다.</p>

                                            <h3>제주도 배송</h3>
                                            <p>제주 배송은 매월 2회 진행되며, 매월 둘째 주차와 마지막 주차에 진행됩니다.</p>
                                            <p>(단, 배송팀 일정이나 운항 스케줄, 기상악화 등의 이유로 제주 배송 일정은 변경될 수 있습니다.)</p>
                                            <p>제주 배송 비용은 별도의 결제가 필요합니다. 구매 전 고객센터를 통해 문의 바랍니다.</p>

                                            <h3>배송 일정</h3>
                                            <ul>
                                                <li>일반주문: 제품 주문 후, 약 3~4주 소요</li>
                                                <li>클럽 무브먼트: 제품 주문 후, 약 3~4주 이후 순차배송</li>
                                                <li>택배배송: 제품 주문 후, 약 7일 소요</li>
                                            </ul>
                                            <p>* 일부 제품(소파, 러그 및 화병 등 악세사리)은 국내 핸드메이드 제작으로 주문 폭주 시 배송기간이 길어질 수 있습니다.</p>
                                            <p>* 천재지변이나 기상이변으로 인한 배송 지연이 발생할 수 있습니다.</p>
                                            <p>* 재고 수량이나 주문량에 따라 배송 소요 기간이 단축될 수도 있습니다.</p>
                                            <p>지정 배송일 확인은 COMMUNITY &gt; FAQ &gt; 배송 &gt; 지역별 지정 배송일 탭에서 가능합니다.</p>

                                            <h3>배송일 변경 위약금 안내</h3>
                                            <p>배송일 확정 이후 고객 단순 변심으로 배송 일정 변경 요청 시, 확정된 배송일 기준 1주일 전까지는 무상 변경 가능합니다.</p>
                                            <p>그 이후 변경 시 위약금이 발생합니다.</p>
                                            <p>위약금: 매주 제품당 5만 원</p>

                                            <h3>배송 절차</h3>
                                            <ol>
                                                <li>STEP 1 - 주문결제: 결제일 기준으로 제작 기간이 상이합니다.</li>
                                                <li>STEP 2 - 배송안내 해피콜: 배송 주차에 일정 확인 전화를 드립니다.</li>
                                                <li>STEP 3 - 배송/설치: 지정한 날짜에 전문 시공팀이 방문해 조립 및 설치합니다.</li>
                                            </ol>

                                            <h3>배송 비용</h3>
                                            <p>제주도를 제외한 지역은 무료배송입니다.</p>
                                            <p>아래의 경우 추가비용이 발생할 수 있습니다.</p>
                                            <ul>
                                                <li>엘리베이터 이용/진입 불가</li>
                                                <li>설치 공간 진입 불가</li>
                                                <li>1층 입구 협소 또는 현장 진입 어려움</li>
                                                <li>계단 이용·추가 인력 투입 필요 시</li>
                                            </ul>
                                            <p>계단 양중비용: 층당 1만 원 (현장 상황에 따라 조정 가능)</p>
                                            <p>사다리차나 엘리베이터 사용료는 고객 부담입니다.</p>

                                            <h3>사다리차 사용 대상</h3>
                                            <ul>
                                                <li>양중 과정 중 손상이 예상되는 제품</li>
                                                <li>무게가 무거운 제품</li>
                                                <li>크기가 큰 제품</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className={`dept-info ${openIndex === 2 ? 'active' : ''}`}>
                                    <div className="dept-title" onClick={() => toggleIndex(2)}>
                                        애프터 서비스
                                        <p className='plus'><img src="/images/plus-hover.png" alt="더보기" /></p>
                                        <p className='minus'><img src="/images/minus-hover.png" alt="숨기기" /></p>
                                    </div>
                                    <div className="dept-ex">
                                        <div class="as-policy">
                                            <p>*꼭 읽어주세요*</p>
                                            <ul>
                                                <li>품질보증 기간 내 해당 A/S 관련 비용은 무료로 진행됩니다.</li>
                                                <li>제품 교체 및 A/S 후 기존 제품과 색상 차이가 발생할 수 있습니다.</li>
                                                <li>정규 규격 상품 외 별도 주문 제품은 A/S 진행이 불가할 수 있습니다.</li>
                                                <li>A/S 진행 시, 수리 외에 배송·출장 등의 서비스 비용은 별도 부과됩니다.</li>
                                                <li>사용자 부주의로 인한 현상은 유상 A/S로 진행됩니다.</li>
                                                <li>A/S 관련 문의: C/S센터 1855-2014 또는 카카오톡 채널</li>
                                            </ul>

                                            <h3>A/S 안내</h3>
                                            <ul>
                                                <li>보증기간 이내에는 무상 A/S, 이후에는 유상 A/S가 가능합니다.</li>
                                                <li>제품 하자에 한해 무상 수리 및 교환이 가능합니다.</li>
                                                <li>사용자 부주의로 인한 경우 제외됩니다.</li>
                                                <li>러그 제품은 특성상 A/S 불가합니다.</li>
                                                <li>공장 입고가 필요한 경우 A/S 기간은 약 2~4주 소요됩니다.</li>
                                                <li>일부 수입 완제품(셀렉트샵)은 A/S 불가할 수 있습니다.</li>
                                                <li>A/S 접수는 구매 후 3일 이내 가능하며, 이후 교환·환불 불가합니다.</li>
                                            </ul>

                                            <h3>보증기간 안내</h3>
                                            <p>
                                                잭슨카멜레온은 품목별 소비자 피해 보상 규정에 따라 제품 보증을 실시합니다.
                                                보증기간은 제품 수령일을 기준으로 산정하며, 정상 사용 중 자연 발생한 품질·성능·기능 하자에 대해 무료 수리를 제공합니다.
                                            </p>
                                            <ul>
                                                <li>러그·화병 제품은 보증기간이 없으며 A/S 불가합니다.</li>
                                                <li>보증기간은 제품 및 하자 유형에 따라 상이합니다.</li>
                                                <li>A/S 후 보증기간은 기존 수령일 기준으로 유지됩니다.</li>
                                                <li>소비자 분쟁 해결 기준(공정거래위원회 고시)에 따라 피해를 보상받을 수 있습니다.</li>
                                            </ul>

                                            <h3>무상 서비스 항목</h3>
                                            <ul>
                                                <li>보증기간 내 정상 사용 중 발생한 고장·결함</li>
                                                <li>시공 과정에서 발생한 하자</li>
                                                <li>배송 과정에서의 오염, 스크래치 등 손상</li>
                                                <li>제작 과정 중 발생한 하자</li>
                                                <li>바닥재 보호용 소모품 (예: 펠트지)</li>
                                            </ul>

                                            <h3>유상 서비스 항목</h3>
                                            <ul>
                                                <li>고객 부주의로 인한 손상 (원단 오염, 내장재 파손 등)</li>
                                                <li>보증기간 만료 후 발생한 A/S</li>
                                                <li>부적절한 취급, 개조, 잘못된 사용으로 인한 손상</li>
                                                <li>이사 중 재조립 불량, 사용 중 발생한 2차 손상</li>
                                                <li>소파 원단 교체(천갈이), 커버링, 내장재 충전 등</li>
                                                <li>패브릭·스펀지·하드웨어 등 소모품은 배송 15일 이후 유상 전환</li>
                                            </ul>

                                            <h3>A/S 불가 항목</h3>
                                            <ul>
                                                <li>정규 제품 외 주문제작(원단·사이즈 변경 등) 제품</li>
                                                <li>사용자 부주의나 잘못된 세척·보관으로 인한 손상</li>
                                                <li>소재 특성상 자연스러운 현상 (패브릭·가죽·원목 등)</li>
                                                <li>기온 차로 인한 변형·변색, 나뭇결·톤 차이, 옹이 등</li>
                                                <li>자연스러운 늘어남, 올풀림, 마모, 변형</li>
                                                <li>수작업 제작의 ±3cm 오차, 봉재 라인 차이</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="service-cs-wrap">

                </div>
            </div>
        </div>
    )
}

export default ShopDetailBottomService