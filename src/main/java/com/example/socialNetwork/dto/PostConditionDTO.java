package com.example.socialNetwork.dto;

import java.util.List;

public class PostConditionDTO {
	private List<String> roomType;
	private Long capacity;
	private String gender;
	private Long firstSize;
	private Long lastSize;
	private Long firstRentPrice;
	private Long lastRentPrice;
	private String province;
	private String district;
	private String wards;
	private String streetName;
	
	private Integer conditioner;
	private Integer privateWc;
	private Integer parking;
	private Integer wifi;
	private Integer freedom;
	private Integer keyy;
	private Integer bed;
	private Integer kitchen;
	private Integer pet;
	private Integer guard;
	private Integer closet;
	private Integer tablee;
	private Integer windoww;
	private Integer refrigerator;
	private Integer waterHeater;
	public List<String> getRoomType() {
		return roomType;
	}
	public Long getCapacity() {
		return capacity;
	}
	public String getGender() {
		return gender;
	}
	public Long getFirstSize() {
		return firstSize;
	}
	public Long getLastSize() {
		return lastSize;
	}
	public Long getFirstRentPrice() {
		return firstRentPrice;
	}
	public Long getLastRentPrice() {
		return lastRentPrice;
	}
	public String getProvince() {
		return province;
	}
	public String getDistrict() {
		return district;
	}
	public String getWards() {
		return wards;
	}
	public String getStreetName() {
		return streetName;
	}
	public Integer getConditioner() {
		return conditioner;
	}
	public Integer getPrivateWc() {
		return privateWc;
	}
	public Integer getParking() {
		return parking;
	}
	public Integer getWifi() {
		return wifi;
	}
	public Integer getFreedom() {
		return freedom;
	}
	public Integer getKeyy() {
		return keyy;
	}
	public Integer getBed() {
		return bed;
	}
	public Integer getKitchen() {
		return kitchen;
	}
	public Integer getPet() {
		return pet;
	}
	public Integer getGuard() {
		return guard;
	}
	public Integer getCloset() {
		return closet;
	}
	public Integer getTablee() {
		return tablee;
	}
	public Integer getWindoww() {
		return windoww;
	}
	public Integer getRefrigerator() {
		return refrigerator;
	}
	public Integer getWaterHeater() {
		return waterHeater;
	}
	public void setRoomType(List<String> roomType) {
		this.roomType = roomType;
	}
	public void setCapacity(Long capacity) {
		this.capacity = capacity;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public void setFirstSize(Long firstSize) {
		this.firstSize = firstSize;
	}
	public void setLastSize(Long lastSize) {
		this.lastSize = lastSize;
	}
	public void setFirstRentPrice(Long firstRentPrice) {
		this.firstRentPrice = firstRentPrice;
	}
	public void setLastRentPrice(Long lastRentPrice) {
		this.lastRentPrice = lastRentPrice;
	}
	public void setProvince(String province) {
		this.province = province;
	}
	public void setDistrict(String district) {
		this.district = district;
	}
	public void setWards(String wards) {
		this.wards = wards;
	}
	public void setStreetName(String streetName) {
		this.streetName = streetName;
	}
	public void setConditioner(Integer conditioner) {
		this.conditioner = conditioner;
	}
	public void setPrivateWc(Integer privateWc) {
		this.privateWc = privateWc;
	}
	public void setParking(Integer parking) {
		this.parking = parking;
	}
	public void setWifi(Integer wifi) {
		this.wifi = wifi;
	}
	public void setFreedom(Integer freedom) {
		this.freedom = freedom;
	}
	public void setKeyy(Integer keyy) {
		this.keyy = keyy;
	}
	public void setBed(Integer bed) {
		this.bed = bed;
	}
	public void setKitchen(Integer kitchen) {
		this.kitchen = kitchen;
	}
	public void setPet(Integer pet) {
		this.pet = pet;
	}
	public void setGuard(Integer guard) {
		this.guard = guard;
	}
	public void setCloset(Integer closet) {
		this.closet = closet;
	}
	public void setTablee(Integer tablee) {
		this.tablee = tablee;
	}
	public void setWindoww(Integer windoww) {
		this.windoww = windoww;
	}
	public void setRefrigerator(Integer refrigerator) {
		this.refrigerator = refrigerator;
	}
	public void setWaterHeater(Integer waterHeater) {
		this.waterHeater = waterHeater;
	}
	@Override
	public String toString() {
		return "PostConditionDTO [roomType=" + roomType + ", capacity=" + capacity + ", gender=" + gender
				+ ", firstSize=" + firstSize + ", lastSize=" + lastSize + ", firstRentPrice=" + firstRentPrice
				+ ", lastRentPrice=" + lastRentPrice + ", province=" + province + ", district=" + district + ", wards="
				+ wards + ", streetName=" + streetName + ", conditioner=" + conditioner + ", privateWc=" + privateWc
				+ ", parking=" + parking + ", wifi=" + wifi + ", freedom=" + freedom + ", keyy=" + keyy + ", bed=" + bed
				+ ", kitchen=" + kitchen + ", pet=" + pet + ", guard=" + guard + ", closet=" + closet + ", tablee="
				+ tablee + ", windoww=" + windoww + ", refrigerator=" + refrigerator + ", waterHeater=" + waterHeater
				+ "]";
	}
	

}
